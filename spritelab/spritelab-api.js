(function SpriteLab() {
    let audioUnlocked = false
    let background = "white";
    let spriteId = 0
    let nativeSpriteMap = {}
    let inputEvents = []
    let behaviors = []
    let userInputEventCallbacks = {}
    let totalPauseTime = 0
    let timerResetTime = { "seconds": 0, "frames": 0 }
    let numActivePrompts = 0
    let screenText = {}
    let defaultSpriteSize = 100
    let printLog = []
    let promptVars = {}
    let eventLog = []
    let speechBubbles = []
    let storyLabText = { "heading": "", "subheading": "" }
    let soundLog = []
    let criteria = []
    let bonusCriteria = []
    let previous = {}
    let successMessage = "genericSuccess"
    let bonusSuccessMessage = "genericBonusSuccess"
    let validationFrames = { "delay": 90, "fail": 150, "pass": 90, "successFrame": 0 }
    let foregroundEffects = []
    let variableBubbles = []
    let MAX_NUM_SPRITES = 1000
    let MAX_NUM_TEXTS = 1000
    let SPRITE_WARNING_BUFFER = 100
    let APP_WIDTH = 400
    let APP_HEIGHT = 400
    let Direction = { "NORTH": 0, "EAST": 1, "SOUTH": 2, "WEST": 3 }
    let SquareType = { "WALL": 0, "OPEN": 1, "START": 2, "FINISH": 3, "OBSTACLE": 4, "STARTANDFINISH": 5 }
    let TurnDirection = { "LEFT": -1, "RIGHT": 1 }
    let MoveDirection = { "FORWARD": 0, "RIGHT": 1, "BACKWARD": 2, "LEFT": 3 }
    let colors = { "darkest_gray": "#2D1313", "black": "#000000" }
    let edges = null;
    const makeIterable = function (e) {
        function u(e, t) {
            if (t == null || t > e.length) {
                t = e.length;
            }
            for (var n = 0, r = Array(t); n < t; n++) {
                r[n] = e[n];
            }
            return r;
        }
        return function (e) {
            if (Array.isArray(e)) return u(e)
        }(e) || function (e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
        }(e) || function (e, t) {
            if (e) {
                if ("string" == typeof e) return u(e, t);
                var n = {}.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0
            }
        }(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    const directionToDxDy = function (e) {
        switch (e) {
            case Direction.NORTH:
                return {
                    dx: 0,
                    dy: -1
                };
            case Direction.EAST:
                return {
                    dx: 1,
                    dy: 0
                };
            case Direction.SOUTH:
                return {
                    dx: 0,
                    dy: 1
                };
            case Direction.WEST:
                return {
                    dx: -1,
                    dy: 0
                };
        }
        throw new Error("Invalid direction value" + e);
    }
    const directionToFrame = function (e) {
        return mod(e * 4, 16);
    }
    const constrainDirection4 = function (e) {
        return mod(e, 4);
    }
    const mod = function (e, t) {
        return (e % t + t) % t;
    }
    const randomValue = function (e) {
        return e[Math.floor(Math.random() * e.length)];
    }
    const randomInt = function (e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }
    const rotate2DArray = function (e) {
        return e[0].map(function (t, n) {
            return e.map(function (t) {
                return t[e.length - n - 1];
            });
        });
    }
    const range = function (e, t) {
        var n = [];
        for (var r = e; r <= t; r++) {
            n.push(r);
        }
        return n;
    }
    const createUuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var t = Math.random() * 16 | 0;
            return (e === "x" ? t : t & 3 | 8).toString(16);
        });
    }
    window.addBehaviorSimple = function (e, t) {
        getSpriteArray(e).forEach(function (e) {
            return addBehavior(e, t);
        });
    }
    window.Behavior = function (e) {
        return {
            func: e,
            name: e.funcName
        };
    }
    const burstFunc = function () {
        return function (t) {
            var n = getSpriteArray(t)[0];
            if (n.delay === 0) {
                n.scale = n.baseScale * 0.4;
            } else if (n.delay < 0) {
                var r = Math.sin(n.direction) * n.speed;
                var o = Math.cos(n.direction) * n.speed;
                n.x += o;
                n.y += r;
                n.scale += n.baseScale * 0.01;
                n.rotation += 6;
            }
            n.delay -= 1;
            if (n.lifetime === 0) {
                destroy.apply(this, [{
                    id: n.id
                }]);
            }
        };
    }
    window.draggable = function () {
        return new Behavior(draggableFunc(), []);
    }
    const popFunc = function () {
        return function (t) {
            var n = getSpriteArray(t)[0];
            var r = Math.sin(n.direction) * 5;
            var o = Math.cos(n.direction) * 5;
            n.x += o;
            n.y += r;
            n.y -= n.speed;
            n.speed -= 1;
            var i = Math.abs(n.direction - 270);
            n.rotation += i * (1 / 6);
            if (n.lifetime === 0) {
                destroy.apply(this, [{
                    id: n.id
                }]);
            }
        };
    }
    const rainFunc = function () {
        return function (t) {
            var n = getSpriteArray(t)[0];
            n.y -= n.speed;
            n.speed -= 0.5;
            n.rotation += randomInt(-5, 5);
            if (n.lifetime === 0) {
                destroy.apply(this, [{
                    id: n.id
                }]);
            }
        };
    }
    const spiralFunc = function () {
        return function (t) {
            var n = getSpriteArray(t)[0];
            if (n.delay <= 0) {
                n.scale += n.baseScale * 0.01;
                var r = (n.delay * 6 + n.initialAngle) * Math.PI / 180;
                var o = n.delay * 6;
                var i = {
                    x: 200,
                    y: 200
                };
                n.x = Math.cos(r) * o + i.x;
                n.y = Math.sin(r) * o + i.y;
            }
            n.delay -= 1;
            if (n.lifetime === 0) {
                destroy.apply(this, [{
                    id: n.id
                }]);
            }
        };
    }
    const draggableFunc = function () {
        return function (t) {
            var n = getSpriteArray(t)[0];
            if (n) {
                var r = getSpriteArray({
                    costume: "all"
                });
                if (p5Inst.mousePressedOver(n) && p5Inst.mouseWentDown()) {
                    var o = Math.max.apply(Math, makeIterable(r.filter(function (t) {
                        return t !== n && p5Inst.mousePressedOver(t);
                    }).map(function (e) {
                        return e.depth;
                    })));
                    if (n.depth > o) {
                        n.dragging = true;
                        n.xOffset = n.x - p5Inst.World.mouseX;
                        n.yOffset = n.y - p5Inst.World.mouseY;
                    }
                }
                if (n.dragging) {
                    n.x = p5Inst.World.mouseX + n.xOffset;
                    n.y = p5Inst.World.mouseY + n.yOffset;
                }
                if (p5Inst.mouseWentUp()) {
                    n.dragging = false;
                }
            }
        };
    }
    const glideFunc = function () {
        return function (t) {
            var r = getSpriteArray(t)[0];
            if (r.glideTargets?.length > 0) {
                var o = r.glideTargets[0];
                if (Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)) < r.speed) {
                    r.x = o.x;
                    r.y = o.y;
                    r.glideTargets.shift();
                } else {
                    var i = Math.atan2(o.y - r.y, o.x - r.x);
                    if (!isNaN(i)) {
                        var a = Math.sin(i) * r.speed;
                        var s = Math.cos(i) * r.speed;
                        r.x += s;
                        r.y += a;
                    }
                }
            }
        };
    }
    const avoidingTargetsFunc = function () {
        return function (t) {
            var n;
            var r = getSpriteArray(t)[0];
            var o = r.position;
            if ((n = r.targetSet) !== null && n !== undefined && n.avoid) {
                var a = r.targetSet.avoid.map(function (t) {
                    return getSpriteArray({
                        costume: t
                    });
                }).flat().filter(function (e) {
                    return o.dist(e.position) < 100;
                });
                if (a.length !== 0) {
                    var s = 0;
                    var l = 0;
                    a.forEach(function (e) {
                        s += e.position.x;
                        l += e.position.y;
                    });
                    var u = p5Inst.createVector(s / a.length, l / a.length);
                    moveToward.apply(this, [t, -5, u]);
                    edgesDisplace.apply(this, [t]);
                }
            }
        };
    }
    const followingTargetsFunc = function () {
        return function (t) {
            var n;
            var r = getSpriteArray(t)[0];
            var o = r.position;
            if ((n = r.targetSet) !== null && n !== undefined && n.follow) {
                var a = r.targetSet.follow.map(function (t) {
                    return getSpriteArray({
                        costume: t
                    });
                }).flat();
                if (a.length !== 0) {
                    var s;
                    var l = Infinity;
                    a.forEach(function (e) {
                        var t = o.dist(e.position);
                        if (t < l) {
                            l = t;
                            s = e;
                        }
                    });
                    moveToward.apply(this, [t, 5, s.position]);
                }
            }
        };
    }
    window.removeAllBehaviors = function (e) {
        getSpriteArray(e).forEach((function (e) {
            behaviors = behaviors.filter((function (t) {
                return t.sprite !== e
            }))
        }))
    }
    window.removeBehaviorSimple = function (e, t) {
        getSpriteArray(e).forEach(function (e) {
            return removeBehavior(e, t);
        });
    }
    const drawHeadings = function (p5Inst, text) {
        let yCursor = 50;
        if (text.heading) {
            const x = APP_WIDTH / 2;
            const y = yCursor;
            const size = getScaledFontSize(p5Inst, text.heading, 50);
            drawLine(p5Inst, text.heading, size, x, y);
            yCursor += 50 / 2;
        }
        if (text.subheading) {
            const x = APP_WIDTH / 2;
            const y = yCursor;
            const size = getScaledFontSize(p5Inst, text.subheading, 16);
            drawLine(p5Inst, text.subheading, size, x, y);
        }
        function getScaledFontSize(p5Inst, text, desiredSize) {
            p5Inst.push();
            p5Inst.textSize(desiredSize);
            const fullWidth = p5Inst.textWidth(text);
            const scaledSize = Math.min(
                desiredSize,
                (desiredSize * (APP_WIDTH - OUTER_MARGIN)) / fullWidth
            );
            const maxLineHeight = 30;

            p5Inst.pop();
            return Math.min(scaledSize, maxLineHeight);
        }

    }
    const arrayEquals = function (e, t) {
        if (e.length !== t.length) {
            return false;
        }
        for (var n = 0; n < e.length; n++) {
            if (e[n] !== t[n]) {
                return false;
            }
        }
        return true;
    }
    const createSpriteCollider = function (e) {
        var t = e.x;
        var n = e.y;
        var r = e.width;
        var o = e.height;
        var i = e.scale;
        return {
            top: n - o * i / 2,
            bottom: n + o * i / 2,
            left: t - r * i / 2,
            right: t + r * i / 2
        };
    }
    const formatForPlayspace = function (e) {
        if (typeof e == "number" && Math.abs(e) >= 1e+21) {
            return e.toPrecision(2);
        } else {
            return `${e}`;
        }
    }
    window.randomColor = function () {
        return ("hsb(" + randomInt(0, 359) + ", 100%, 100%)").toString("#rrggbb");
    }
    const randomColorFromPalette = function (e) {
        return e[randomInt(0, e.length - 1)];
    }
    const drawStoryLabText = function () {
        if (storyLabText.heading || storyLabText.subheading) {
            drawHeadings(p5Inst, storyLabText);
        }
    }
    const clearHeadings = function () {
        storyLabText = {
            heading: "",
            subheading: ""
        };
    }
    const setHeading = function (e) {
        storyLabText.heading = e;
    }
    const setSubheading = function (e) {
        storyLabText.subheading = e;
    }
    const getHeading = function () {
        return storyLabText.heading;
    }
    const getSubheading = function () {
        return storyLabText.subheading;
    }
    const getStoryLabText = function () {
        return storyLabText;
    }
    const resolveLocation = function (e, t) {
        if (!e) {
            return t || {
                x: 200,
                y: 200
            };
        }
        if (typeof e == "function") {
            return e();
        } else {
            return e;
        }
    }
    const stringToChunks = function (str, maxLength, delimiter = ' ') {
        return str.split(delimiter).reduce(
            (acc, val) => {
                let lastVal = '';
                if (acc[acc.length - 1].length + val.length < maxLength) {
                    lastVal = acc.pop() + delimiter;
                }

                lastVal += val;
                acc.push(lastVal.trim());
                return acc;
            },
            ['']
        );
    }
    window.executeDrawLoopAndCallbacks = function () {
        drawBackground();
        runBehaviors();
        runEvents();
        p5Inst.drawSprites();
        drawVariableBubbles();
        drawSpeechBubbles();
        if (!isPreviewFrame()) {
            foregroundEffects.forEach(function (e) {
                return e.func();
            });
        }
        if (screenText.title || screenText.subtitle) {
            drawTitle();
        }
        drawStoryLabText();
    }
    const isPreviewFrame = function () {
        return currentFrame() === 1;
    }
    const currentFrame = function () {
        return p5Inst.World.frameCount;
    }
    const getBackground = function () {
        return background;
    }
    window.setBackground = function (e) {
        background = e;
    }
    const drawBackground = function () {
        if (typeof background == "string") {
            p5Inst.background(background);
        } else {
            p5Inst.background("white");
        }
        if (typeof background === "object") {
            p5Inst.image(background.spriteSheet.image, 0, 0, 400, 400)
        }
    }
    const drawSpeechBubbles = function () {
        removeExpiredSpeechBubbles();
        if (speechBubbles.length !== 0 && !isPreviewFrame()) {
            speechBubbles.forEach(function (t) {
                var n = t.text;
                var r = t.sprite;
                var o = t.bubbleType;
                drawSpeechBubble(n, r.x, r.y - Math.round(r.getScaledHeight() / 2), o);
            });
        }
    }
    const variableBubble = function (p5Inst, x, y, text, config) {
        const textWidth = getTextWidth(text, config.textSize);
        const textWidthValue = textWidth + 2 * config.padding;
        const textHeightValue = config.textSize + 2 * config.padding;

        const halfWidth = textWidthValue / 2;
        const halfHeight = textHeightValue / 2;
        const leftBound = x - halfWidth;
        const rightBound = x + halfWidth;
        const topBound = y - halfHeight;
        const bottomBound = y + halfHeight;

        // If the bubble is too close to the edge of the canvas, adjust the position so it fits.
        if (leftBound < 0) {
            x = halfWidth;
        } else if (rightBound > APP_WIDTH) {
            x = APP_WIDTH - halfWidth;
        }

        if (topBound < 0) {
            y = halfHeight;
        } else if (bottomBound > APP_HEIGHT) {
            y = APP_HEIGHT - halfHeight;
        }

        p5Inst.push();
        p5Inst.fill(colors.darkest_gray);
        p5Inst.stroke('white');
        p5Inst.strokeWeight(config.strokeWeight);
        p5Inst.rectMode(p5Inst.CENTER);
        p5Inst.rect(x, y, textWidthValue, textHeightValue, config.strokeRadius);

        p5Inst.fill('white');
        p5Inst.noStroke();
        p5Inst.textSize(config.textSize);
        p5Inst.textAlign(p5Inst.CENTER, p5Inst.CENTER);
        p5Inst.text(text, x, y);
        p5Inst.pop();
    }
    const drawVariableBubbles = function () {
        var t = {
            textSize: 20,
            padding: 10,
            strokeWeight: 3,
            strokeRadius: 24,
            maxLabelLength: 20
        };
        var n = getTextWidth(": ", t.textSize);
        var o = t.padding * 2 + n;
        variableBubbles.forEach(function (n) {
            var i = n.name;
            var a = n.label;
            var s = n.location;
            if (i.length && a.length && s) {
                var l = getVariableValue(i, "");
                var d = a.length > t.maxLabelLength ? a.slice(0, t.maxLabelLength) + "…" : a;
                var f = getTextWidth(d, t.textSize);
                var h = APP_WIDTH - o - f;
                var p = truncateText(l, h, t.textSize);
                var g = `${d}: ${p}`;
                variableBubble(p5Inst, s.x, s.y, g, t);
            }
        });
    }
    const getVariableValue = function (e, t) {
        try {
            var n = this[e];
            if (n === undefined) {
                return t;
            } else {
                return n;
            }
        } catch (r) {
            console.error(`Error evaluating variable '${e}': ${r}`);
            return "";
        }
    }
    const ellipsify = function (inputText, maxLength) {
        if (inputText && inputText.length > maxLength) {
            return inputText.substr(0, maxLength - 3) + '...';
        }
        return inputText || '';
    }
    const speechBubble = function (bubbleX, bubbleY, bubbleWidth, bubbleHeight, spriteX, spriteY,
        {
            tailWidth = 10,
            tailHeight = 10,
            tailTipX = spriteX,
            radius = 8,
            fill = 'white',
            strokeWeight = 2,
            stroke = 'gray',
        } = {},
        bubbleType) {
        if (bubbleY + bubbleHeight + tailHeight > spriteY) {
            tailHeight = Math.max(1, spriteY - (bubbleY + bubbleHeight));
        }
        if (spriteX < bubbleWidth / 2) {
            tailTipX = Math.max(spriteX, radius + tailWidth);
        }
        if (spriteX > APP_WIDTH - bubbleWidth / 2) {
            tailTipX = Math.min(spriteX, APP_WIDTH - radius);
        }
        const tailTopY = bubbleY + bubbleHeight;
        const tailBottomY = Math.max(spriteY, bubbleY + bubbleHeight);
        const bubbleCenterX = bubbleX + bubbleWidth / 2;
        const tailTopX = (tailTipX + bubbleCenterX) / 2;
        const tailBottomX = (tailTipX + tailTopX) / 2;
        p5Inst.push();
        p5Inst.stroke(stroke);
        p5Inst.strokeWeight(strokeWeight);
        p5Inst.fill(fill);
        switch (bubbleType) {
            case 'think':
                // Thought bubbles have more-rounded corners, and trailing circles.
                p5Inst.rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, radius * 3);
                p5Inst.ellipse(tailTopX, tailTopY, tailHeight);
                p5Inst.ellipse(tailBottomX, tailBottomY, tailHeight / 2);
                break;
            case 'say':
            default:
                // Speech bubbles have less-rounded corners and a triangular tail.
                p5Inst.rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, radius);
                p5Inst.stroke(fill);
                p5Inst.triangle(
                    tailTipX - tailHeight,
                    tailTopY,
                    tailTipX,
                    tailTopY,
                    tailTipX,
                    tailBottomY
                );
                p5Inst.stroke(stroke);
                p5Inst.line(tailTipX, tailTopY, tailTipX, tailBottomY);
                p5Inst.line(tailTipX, tailBottomY, tailTipX - tailHeight - 1, tailTopY);
                break;
        }
        p5Inst.pop();

        return { bubbleX, bubbleY };
    }
    const multilineText = function (lines, x, y, size, { color = colors.black, horizontalAlign = 'left', verticalAlign = 'top' } = {}) {
        p5Inst.push();
        p5Inst.textSize(size);
        p5Inst.textAlign(horizontalAlign, verticalAlign);
        p5Inst.fill(color);
        lines.forEach((line, i) => p5Inst.text(line, x, y + i * size));
        p5Inst.pop();
    }
    const drawSpeechBubble = function (e, t, n, o) {
        var i;
        var s;
        if (typeof e == "number") {
            e = e.toString();
        }
        if (typeof e != "string") {
            e = "";
        }
        if ((e = (0, ellipsify)(e, 150)).length < 50) {
            i = 20;
            s = 16;
        } else if (e.length < 75) {
            i = 15;
            s = 20;
        } else {
            i = 10;
            s = 28;
        }
        var c = (0, stringToChunks)(e, s);
        var d = makeIterable(c).sort(function (e, t) {
            if (getTextWidth(e, i) < getTextWidth(t, i)) {
                return 1;
            } else {
                return -1;
            }
        })[0];
        var f = Math.max(50, getTextWidth(d, i) + 16);
        var h = c.length * i + 16;
        var p = Math.max(0, Math.min(APP_HEIGHT, n) - h - 10);
        var g = Math.max(0, Math.min(APP_WIDTH - f, t - f / 2));
        speechBubble(g, p, f, h, t, n, {
            tailHeight: 10,
            radius: 8
        }, o);
        multilineText(c, g + f / 2, p + 8, i, {
            horizontalAlign: p5Inst.CENTER
        });
    }
    const addVariableBubble = function (e, t, n) {
        var r = variableBubbles.find(function (t) {
            return t.label === e;
        });
        var i = resolveLocation(n, r ? r.location : undefined);
        if (r) {
            r.location = i;
        } else {
            variableBubbles.push({
                label: e,
                name: t,
                location: i
            });
        }
    }
    const removeVariableBubble = function (e) {
        variableBubbles = variableBubbles.filter(function (t) {
            return t.label !== e;
        });
    }
    const getVariableBubbles = function () {
        return variableBubbles;
    }
    const getForegroundEffects = function () {
        return foregroundEffects;
    }
    const addSpeechBubble = function (e, t, n = null, r = "say") {
        removeSpeechBubblesForSprite(e);
        var o = (0, createUuid)();
        var i = n ? getUnpausedWorldTime() + n : null;
        speechBubbles.push({
            id: o,
            sprite: e,
            text: t,
            removeAt: i,
            renderFrame: currentFrame(),
            bubbleType: r
        });
        return o;
    }
    const removeSpeechBubblesForSprite = function (e) {
        speechBubbles = speechBubbles.filter(function (t) {
            return t.sprite !== e;
        });
    }
    const removeExpiredSpeechBubbles = function () {
        speechBubbles = speechBubbles.filter(function (t) {
            var n = t.removeAt;
            return !n || n > getUnpausedWorldTime();
        });
    }
    const startPause = function (e) {
        currentPauseStartTime = e;
    }
    const endPause = function (e) {
        if (currentPauseStartTime) {
            totalPauseTime += e - currentPauseStartTime;
            currentPauseStartTime = 0;
        }
    }
    const getUnpausedWorldTime = function () {
        var e = new Date().getTime();
        return Math.round((e - p5Inst._startTime - totalPauseTime) / 1000);
    }
    const getSecondsSinceReset = function () {
        return getUnpausedWorldTime(p5Inst) - timerResetTime.seconds;
    }
    const getFramesSinceReset = function () {
        return p5Inst.frameCount - timerResetTime.frames;
    }
    const getSpriteArray = function (e) {
        if (!e) {
            return [];
        }
        if (Object.prototype.hasOwnProperty.call(e, "id")) {
            var t = nativeSpriteMap[e.id];
            if (t) {
                return [t];
            }
        }
        if (e.name) {
            var n = Object.values(nativeSpriteMap).find(function (t) {
                return t.name === e.name;
            });
            if (n) {
                return [n];
            }
        }
        if (e.costume) {
            if (e.costume === "all") {
                return Object.values(nativeSpriteMap);
            } else {
                return Object.values(nativeSpriteMap).filter(function (t) {
                    return t.getAnimationLabel() === e.costume;
                });
            }
        } else if (typeof e.group == "string") {
            if (e.group === "") {
                return Object.values(nativeSpriteMap).filter(function (e) {
                    return !e.group;
                });
            } else {
                return Object.values(nativeSpriteMap).filter(function (t) {
                    return t.group === e.group;
                });
            }
        } else {
            return [];
        }
    }
    const getAnimationsInUse = function () {
        var e = new Set();
        Object.values(nativeSpriteMap).filter(function (t) {
            return e.add(t.getAnimationLabel());
        });
        return Array.from(e);
    }
    const getNumBehaviorsForAnimation = function (e) {
        var t = 0;
        behaviors.forEach(function (n) {
            if (n.sprite.getAnimationLabel() === e) {
                t++;
            }
        });
        return t;
    }
    const getNumBehaviorsForSpriteId = function (e) {
        var t = 0;
        behaviors.forEach(function (n) {
            if (n.sprite.id === e) {
                t++;
            }
        });
        return t;
    }
    const getBehaviorsForSpriteId = function (e) {
        var t = [];
        behaviors.forEach(function (n) {
            if (n.sprite.id === e) {
                t.push(n.name);
            }
        });
        return t;
    }
    const getSpriteIdsInUse = function () {
        var e = [];
        Object.keys(nativeSpriteMap).forEach(function (t) {
            return e.push(parseInt(t));
        });
        return e;
    }
    const getNumberOfSprites = function () {
        return Object.keys(nativeSpriteMap).length;
    }
    const getMaxAllowedNewSprites = function (e) {
        var t = getNumberOfSprites();
        var n = MAX_NUM_SPRITES - t;
        return Math.min(e, n);
    }
    const getLastSpeechBubbleForSpriteId = function (e) {
        var t = speechBubbles.filter(function (t) {
            return t.sprite.id === parseInt(e);
        });
        return t[t.length - 1];
    }
    const getTextWidth = function (text, size) {
        p5Inst.push();
        p5Inst.textSize(size);
        const width = p5Inst.textWidth(text);
        p5Inst.pop();
        return width;
    }
    const reachedSpriteMax = function () {
        return getNumberOfSprites() >= MAX_NUM_SPRITES;
    }
    const reachedSpriteWarningThreshold = function () {
        return getNumberOfSprites() === MAX_NUM_SPRITES - SPRITE_WARNING_BUFFER;
    }
    const dispatchSpriteLimitWarning = function () {
        console.warn(`Woah there your almost exceeding the sprite limit!\nSprites: ${getNumberOfSprites()}/${MAX_NUM_SPRITES}`);
    }
    const addSprite = function (e) {
        if (!reachedSpriteMax() && !(reachedSpriteWarningThreshold() && dispatchSpriteLimitWarning(), e = e || {}, getNumberOfSprites() >= MAX_NUM_SPRITES)) {
            var t = e.name;
            var n = resolveLocation(e.location);
            var r = e.animation;
            var i = p5Inst.createSprite(n.x, n.y);
            if (e.group) {
                i.group = e.group;
            }
            nativeSpriteMap[spriteId] = i;
            i.id = spriteId;
            if (t) {
                enforceUniqueSpriteName(t);
                i.name = t;
            }
            i.direction = e.direction || 0;
            i.rotation = e.rotation || 0;
            i.speed = e.speed || 5;
            i.lifetime = e.lifetime || -1;
            if (e.delay) {
                i.delay = e.delay;
            }
            if (e.initialAngle) {
                i.initialAngle = e.initialAngle;
            }
            var a = e.minimumScale || 100;
            i.baseScale = 1;
            i.setScale = function (e) {
                i.scale = e * i.baseScale;
            };
            i.getScale = function () {
                return i.scale / i.baseScale;
            };
            if (r) {
                i.setAnimation(r);
                i.scale /= i.baseScale;
                i.baseScale = 100 / Math.max(a, i.animation.getHeight(), i.animation.getWidth());
                i.scale *= i.baseScale;
            }
            i.setScale((e.scale || defaultSpriteSize) / 100);
            runSpriteCreatedEvents(i);
            spriteId++;
            return i.id;
        }
    }
    const enforceUniqueSpriteName = function (e) {
        Object.values(nativeSpriteMap).forEach(function (t) {
            if (t.name === e) {
                t.name = undefined;
            }
        });
    }
    const deleteSprite = function (e) {
        delete nativeSpriteMap[e];
    }
    const addEvent = function (e, t, n) {
        inputEvents.push({
            type: e,
            args: t,
            callback: n
        });
    }
    const clearCollectDataEvents = function () {
        inputEvents = inputEvents.filter(function (e) {
            return e.type !== "collectData";
        });
    }
    const runSpriteCreatedEvents = function (e) {
        inputEvents.filter(function (t) {
            return t.type === "whenSpriteCreated" && (t.args.name !== undefined && t.args.name === e.name || t.args.costume === e.getAnimationLabel() || t.args.costume === "all");
        }).forEach(function (n) {
            eventLog.push(`spriteCreated: ${e.id}`);
            n.callback({
                newSprite: e.id
            });
        });
    }
    const atTimeEvent = function (e) {
        if (e.args.unit === "seconds") {
            var t = e.previousTime || 0;
            var n = getSecondsSinceReset();
            e.previousTime = n;
            if (n === e.args.n && t !== e.args.n) {
                eventLog.push(`atTime: ${e.args.n}`);
                return [{}];
            }
        } else if (e.args.unit === "frames") {
            if (getFramesSinceReset() === e.args.n) {
                eventLog.push(`atTime: ${e.args.n}`);
                return [{}];
            }
        }
        return [];
    }
    const collectDataEvent = function (e) {
        var t = e.previous || 0;
        var n = getUnpausedWorldTime(p5Inst);
        e.previous = n;
        if (n !== t) {
            return [{}];
        } else {
            return [];
        }
    }
    const everyIntervalEvent = function (e) {
        if (e.args.unit === "seconds") {
            var t = e.previousTime || 0;
            var n = e.previousModdedTime || 0;
            var r = getSecondsSinceReset();
            var o = r % e.args.n;
            e.previousTime = r;
            e.previousModdedTime = o;
            var i = e.args.n === 1 && t !== r;
            if (o === 0 && n !== 0 || i) {
                eventLog.push(`everyInterval: ${e.args.n}`);
                return [{}];
            }
        } else if (e.args.unit === "frames") {
            if (getFramesSinceReset() % e.args.n === 0) {
                eventLog.push(`everyInterval: ${e.args.n}`);
                return [{}];
            }
        }
        return [];
    }
    const repeatForeverEvent = function (e) {
        return [{}];
    }
    const whenPressEvent = function (e) {
        if (p5Inst.keyWentDown(e.args.key)) {
            eventLog.push(`whenPress: ${e.args.key}`);
            return [{}];
        } else {
            return [];
        }
    }
    const whilePressEvent = function (e) {
        var t;
        if (p5Inst.keyDown(e.args.key)) {
            if ((t = eventLog[eventLog.length - 1]) === null || t === undefined || !t.includes("whilePress")) {
                eventLog.push(`whilePress: ${e.args.key}`);
            }
            return [{}];
        } else {
            return [];
        }
    }
    const whenTouchEvent = function (e) {
        var n = getSpriteArray(e.args.sprite1);
        var r = getSpriteArray(e.args.sprite2);
        var o = [];
        var i = e.previous;
        e.previous = {};
        n.forEach(function (n) {
            r.forEach(function (r) {
                var a;
                var s;
                var l;
                var u;
                var c = function (e, t, n) {
                    if (e && e[t] && e[t][n]) {
                        return e[t][n].firedOnce;
                    }
                }(i, n.id, r.id);
                if (n.overlap(r)) {
                    if (!c) {
                        eventLog.push(`whenTouch: ${n.id} ${r.id}`);
                        o.push({
                            subjectSprite: n.id,
                            objectSprite: r.id
                        });
                        c = true;
                    }
                } else {
                    c = false;
                }
                a = e.previous;
                s = n.id;
                l = r.id;
                u = c;
                a ||= {};
                a[s] ||= {};
                a[s][l] ||= {};
                a[s][l].firedOnce = u;
            });
        });
        return o;
    }
    const whileTouchEvent = function (e) {
        var n = [];
        var r = getSpriteArray(e.args.sprite1);
        var o = getSpriteArray(e.args.sprite2);
        r.forEach(function (e) {
            o.forEach(function (r) {
                var o;
                if (e.overlap(r)) {
                    if ((o = eventLog[eventLog.length - 1]) === null || o === undefined || !o.includes("whileTouch")) {
                        eventLog.push(`whileTouch: ${e.id} ${r.id}`);
                    }
                    n.push({
                        subjectSprite: e.id,
                        objectSprite: r.id
                    });
                }
            });
        });
        return n;
    }
    const whenClickEvent = function (e) {
        var n = [];
        if (p5Inst.mouseWentDown("leftButton")) {
            getSpriteArray(e.args.sprite).forEach(function (e) {
                if (p5Inst.mouseIsOver(e)) {
                    eventLog.push(`whenClick: ${e.id}`);
                    n.push({
                        clickedSprite: e.id
                    });
                }
            });
        }
        return n;
    }
    const whileClickEvent = function (e) {
        var n = [];
        getSpriteArray(e.args.sprite).forEach(function (e) {
            var r;
            if (p5Inst.mousePressedOver(e)) {
                if ((r = eventLog[eventLog.length - 1]) === null || r === undefined || !r.includes("whileClick")) {
                    eventLog.push(`whileClick: ${e.id}`);
                }
                n.push({
                    clickedSprite: e.id
                });
            }
        });
        return n;
    }
    const checkAllPromptsAnswered = function (e) {
        var t = e.previous;
        e.previous = numActivePrompts;
        if (t !== numActivePrompts && numActivePrompts === 0) {
            return [{}];
        } else {
            return [];
        }
    }
    const getCallbackArgListForEvent = function (e) {
        switch (e.type) {
            case "atTime":
                return atTimeEvent(e);
            case "collectData":
                return collectDataEvent(e);
            case "everyInterval":
                return everyIntervalEvent(e);
            case "repeatForever":
                return repeatForeverEvent(e);
            case "whenpress":
                return whenPressEvent(e);
            case "whilepress":
                return whilePressEvent(e);
            case "whentouch":
                return whenTouchEvent(e);
            case "whiletouch":
                return whileTouchEvent(e);
            case "whenclick":
                return whenClickEvent(e);
            case "whileclick":
                return whileClickEvent(e);
            case "whenSpriteCreated":
                return [];
            case "whenAllPromptsAnswered":
                return checkAllPromptsAnswered(e);
        }
    }
    const runEvents = function () {
        inputEvents.forEach(function (t) {
            getCallbackArgListForEvent(t).forEach(function (e) {
                t.callback(e);
            });
        });
    }
    const addBehavior = function (e, t) {
        if (e && t) {
            if (!behaviors.find(function (n) {
                return n.sprite === e && n.name === t.name;
            })) {
                behaviors.push({
                    func: t.func,
                    name: t.name,
                    sprite: e
                });
            }
        }
    }
    const removeBehavior = function (e, t) {
        if (e && t) {
            var n = behaviors.findIndex(function (n) {
                return n.sprite === e && n.name === t.name;
            });
            if (n !== -1) {
                behaviors.splice(n, 1);
            }
        }
    }
    const runBehaviors = function () {
        behaviors.forEach(function (e) {
            return e.func({
                id: e.sprite.id
            });
        });
    }
    const getP5Color = function (e, t) {
        var n = p5Inst.color(e);
        if (t !== undefined) {
            n._array[3] = t / n.maxes[n.mode][3];
        }
        var r = n._array;
        var o = n.levels = new Array(r.length);
        for (var i = r.length - 1; i >= 0; --i) {
            o[i] = Math.round(r[i] * 255);
        }
        return n;
    }
    const addTarget = function (e, t, n) {
        if (["follow", "avoid"].includes(n)) {
            getSpriteArray(e).forEach(function (e) {
                e.targetSet ||= {
                    follow: [],
                    avoid: []
                };
                if (!e.targetSet[n].includes(t)) {
                    e.targetSet[n].push(t);
                }
            });
        } else {
            console.warn(`unkknown targetType: ${n}`);
        }
    }
    window.bounceOff = function (e, t) {
        var n = getSpriteArray(e);
        var r = getSpriteArray(t);
        n.forEach(function (e) {
            r.forEach(function (t) {
                if (e.isTouching(t)) {
                    e.direction = (e.direction + 180) % 360;
                    var n = Math.atan2(t.y - e.y, t.x - e.x);
                    if (!isNaN(n)) {
                        var r = Math.sin(n) * -(e.speed + 1);
                        var o = Math.cos(n) * -(e.speed + 1);
                        e.x += o;
                        e.y += r;
                    }
                }
            });
        });
    }
    window.changePropBy = function (e, t, n) {
        if (n !== undefined && t !== undefined) {
            var r = getSpriteArray(e);
            var o = {
                direction: function (e) {
                    return e.direction = (e.direction + n) % 360;
                },
                scale: function (e) {
                    e.setScale(e.getScale() + n / 100);
                    if (e.scale < 0) {
                        e.scale = 0;
                    }
                },
                y: function (e) {
                    return e.y -= n;
                },
                velocityY: function (e) {
                    e.velocityY -= n;
                }
            };
            r.forEach(function (e) {
                if (o[t]) {
                    o[t](e);
                } else {
                    e[t] += n;
                }
            });
        }
    }
    const collide = function (e, t, n) {
        var r = getSpriteArray(t);
        var o = getSpriteArray(n);
        r.forEach(function (t) {
            o.forEach(function (n) {
                return t[e](n);
            });
        });
    }
    const deepHelperCopy = function (e, t) {
        if (t == null || t > e.length) {
            t = e.length;
        }
        for (var n = 0, r = Array(t); n < t; n++) {
            r[n] = e[n];
        }
        return r;
    }
    window.edgesDisplace = function (e) {
        if (!edges) {
            edges = p5Inst.createEdgeSprites();
        }
        getSpriteArray(e).forEach(function (e) {
            return edges.displace(e);
        });
    }
    const edgesCollide = function (e) {
        if (!edges) {
            edges = p5Inst.createEdgeSprites();
        }
        getSpriteArray(e).forEach(function (e) {
            return e.collide(edges);
        });
    }
    const glideTo = function (e, t) {
        if (t) {
            getSpriteArray(e).forEach(function (e) {
                e.glideTargets ||= [];
                e.glideTargets.push(t);
                addBehavior(e, {
                    func: glideFunc.apply(this),
                    name: "glide"
                });
            });
        }
    }
    const isCostumeEqual = function (e, t) {
        var n = getSpriteArray(e);
        return n.length !== 0 && n.every(function (e) {
            return e.getAnimationLabel() === t;
        });
    }
    const layoutSprites = function (e, t) {
        var n = getSpriteArray({
            costume: e
        });
        (0, layoutSpriteGroup)(n, t, p5Inst);
    }
    const layoutSpriteGroup = function (e, t, l) {
        var u = e.length;
        if (!u) {
            return;
        }
        e.forEach(function (e) {
            e.setScale(0.3);
        });
        if (t === "top") {
            a(e, 100);
        } else if (t === "row") {
            a(e, 200);
        } else if (t === "bottom") {
            a(e, 300);
        } else if (t === "border") {
            (function (e) {
                if (u > 0) {
                    e[0].x = n;
                    e[0].y = o;
                }
                if (u > 1) {
                    e[1].x = r;
                    e[1].y = o;
                }
                if (u > 2) {
                    e[2].x = r;
                    e[2].y = i;
                }
                if (u > 3) {
                    e[3].x = n;
                    e[3].y = i;
                }
                if (u > 4) {
                    for (var t = Math.ceil((u - 4 - 0) / 4), a = Math.ceil((u - 4 - 1) / 4), s = Math.ceil((u - 4 - 2) / 4), c = Math.ceil((u - 4 - 3) / 4), d = 0; d < t; d++) {
                        var f = e[4 + d];
                        f.x = l.lerp(n, r, (d + 1) / (t + 1));
                        f.y = o;
                    }
                    for (var h = 0; h < a; h++) {
                        var p = e[4 + t + h];
                        p.x = r;
                        p.y = l.lerp(o, i, (h + 1) / (a + 1));
                    }
                    for (var g = 0; g < s; g++) {
                        var m = e[4 + t + a + g];
                        m.x = l.lerp(n, r, (g + 1) / (s + 1));
                        m.y = i;
                    }
                    for (var b = 0; b < c; b++) {
                        var v = e[4 + t + a + s + b];
                        v.x = n;
                        v.y = l.lerp(o, i, (b + 1) / (c + 1));
                    }
                }
            })(e);
        } else if (t === "circle") {
            (function (e) {
                var t = 165;
                var n = l.constrain(u / 10, 0, 1);
                var r = l.lerp(50, t, n);
                var o = l.lerp(0.8, 0.3, n * n);
                var i = -Math.PI / 2;
                var a = Math.PI * 2 / u;
                e.forEach(function (e, t) {
                    var n = a * t + i;
                    e.x = 200 + r * Math.cos(n);
                    e.y = 200 + r * Math.sin(n);
                    e.setScale(o);
                });
            })(e);
        } else if (t === "grid") {
            (function (e) {
                var t = Math.ceil(Math.sqrt(u));
                var a = Math.ceil(u / t);
                e.forEach(function (e, s) {
                    var u = Math.floor(s / t);
                    var c = s % t;
                    e.x = l.lerp(n, r, c / (t - 1) || 0);
                    e.y = l.lerp(o, i, u / (a - 1) || 0);
                });
            })(e);
        } else if (t === "left") {
            yeildGenerator(e, 100);
        } else if (t === "column") {
            yeildGenerator(e, 200);
        } else {
            if (t !== "right") {
                throw new Error("Unexpected layout: " + t);
            }
            yeildGenerator(e, 300);
        }
        var n = 20;
        var r = 400 - n;
        var o = 35;
        var i = 360;
        function a(e, t) {
            for (var n = e.length, r = 0; r < n; r++) {
                var o = e[r];
                o.x = (r + 1) * (400 / (n + 1));
                o.y = t;
            }
        }
        function s(e, t) {
            for (var n = e.length, r = 0; r < n; r++) {
                var o = e[r];
                o.x = t;
                o.y = (r + 1) * (400 / (n + 1));
            }
        }
    }
    window.isKeyPressed = function (e) {
        return p5Inst.keyDown(e);
    }
    window.isTouchingEdges = function (e) {
        if (!edges) {
            edges = p5Inst.createEdgeSprites();
        }
        var n = getSpriteArray(e);
        var r = false;
        n.forEach(function (e) {
            if (e.isTouching(edges)) {
                r = true;
            }
        });
        return r;
    }
    const isTouchingSprite = function (e, t) {
        var n = getSpriteArray(e);
        var r = getSpriteArray(t);
        var o = false;
        n.forEach(function (e) {
            r.forEach(function (t) {
                if (e.isTouching(t)) {
                    o = true;
                }
            });
        });
        return o;
    }
    const isDirectlyAbove = function (e, t) {
        var n = getSpriteArray(e);
        var o = getSpriteArray(t);
        var a = false;
        n.forEach(function (e) {
            var t = (0, i.createSpriteCollider)(e);
            if (t.bottom >= APP_HEIGHT) {
                a = true;
            } else {
                var n;
                var l = yeildGenerator(o);
                try {
                    for (l.s(); !(n = l.n()).done;) {
                        var u = n.value;
                        var c = (0, i.createSpriteCollider)(u);
                        if (t.bottom === c.top && t.left <= c.right && t.right >= c.left) {
                            a = true;
                            break;
                        }
                    }
                } catch (d) {
                    l.e(d);
                } finally {
                    l.f();
                }
            }
        });
        return a;
    }
    window.jumpTo = function (e, t) {
        if (t) {
            getSpriteArray(e).forEach(function (e) {
                e.x = t.x;
                e.y = t.y;
            });
        }
    }
    window.mirrorSprite = function (e, t) {
        getSpriteArray(e).forEach(function (e) {
            if (t === "right") {
                e.mirrorX(1);
            } else {
                e.mirrorX(-1);
            }
        });
    }
    const moveAtAngle = function (e, t, n) {
        getSpriteArray(t).forEach(function (e) {
            e.direction ||= 0;
            var t = e.direction % 360;
            e.x += n * Math.cos(t * Math.PI / 180);
            e.y += n * Math.sin(t * Math.PI / 180);
        });
    }
    window.moveForward = function (e, t) {
        moveAtAngle(this, e, t);
    }
    window.moveBackward = function (e, t) {
        moveAtAngle(this, e, t * -1);
    }
    window.moveInDirection = function (e, t, n) {
        var r = getSpriteArray(e);
        var o = {
            North: function (e) {
                return e.y -= t;
            },
            East: function (e) {
                return e.x += t;
            },
            South: function (e) {
                return e.y += t;
            },
            West: function (e) {
                return e.x -= t;
            }
        };
        if (o[n]) {
            r.forEach(function (e) {
                o[n](e);
            });
        } else {
            console.error("invalid direction: " + n);
        }
    }
    window.moveToward = function (e, t, n) {
        getSpriteArray(e).forEach(function (e) {
            if (e && n) {
                if (Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2)) < t) {
                    e.x = n.x;
                    e.y = n.y;
                    return;
                }
                var r = Math.atan2(n.y - e.y, n.x - e.x);
                if (!isNaN(r)) {
                    var o = Math.sin(r) * t;
                    var i = Math.cos(r) * t;
                    e.x += i;
                    e.y += o;
                }
            }
        });
    }
    const setDefaultSpriteSize = function (e) {
        defaultSpriteSize = e;
    }
    window.setProp = function (e, t, n) {
        if (n !== undefined) {
            var o = getSpriteArray(e);
            var i = {
                direction: function (e) {
                    return e.direction = n % 360;
                },
                draggable: function (e) {
                    if (n) {
                        addBehavior(e, {
                            func: draggableFunc.apply(this),
                            name: "draggable"
                        });
                    } else {
                        removeBehavior(e, {
                            func: draggableFunc.apply(this),
                            name: "draggable"
                        });
                    }
                },
                height: function (e) {
                    return e.height = e.animation.getHeight() * n / 100;
                },
                scale: function (e) {
                    return e.setScale(n / 100);
                },
                width: function (e) {
                    return e.width = e.animation.getWidth() * n / 100;
                },
                y: function (e) {
                    return e.y = 400 - n;
                },
                velocityY: function (e) {
                    return e.velocityY = -n;
                }
            };
            o.forEach(function (e) {
                if (i[t]) {
                    i[t](e);
                } else {
                    e[t] = n;
                }
            });
        }
    }
    const messageEvent = function (t, n, r, o) {
        var i;
        if ((i = getSpriteArray(t)) !== null && i !== undefined) {
            i.forEach(function (t) {
                addSpeechBubble(t, n, r, o);
            });
        }
    }
    window.hideVariable = function (e, t) {
        if (e) {
            removeVariableBubble(e);
        }
    }
    window.showVariable = function (e, t, n) {
        if (e && t) {
            addVariableBubble(e, t, n);
        }
    }
    window.spriteSay = function (e, t) {
        messageEvent(e, t, 4, "say");
    }
    window.spriteSayTime = function (e, t, n) {
        messageEvent(e, t, n, "say");
    }
    const spriteThink = function (e, t) {
        messageEvent(e, t, 4, "think");
    }
    const spriteThinkTime = function (e, t, n) {
        messageEvent(e, t, n, "think");
    }
    window.removeTint = function (e) {
        getSpriteArray(e).forEach(function (e) {
            return e.tint = null;
        });
    }
    window.setTint = function (e, t) {
        getSpriteArray(e).forEach(function (e) {
            return e.tint = t;
        });
    }
    window.turn = function (e, t, n) {
        if (t) {
            getSpriteArray(e).forEach(function (e) {
                if (n === "right") {
                    e.rotation += t;
                    e.direction += t;
                } else {
                    e.rotation -= t;
                    e.direction -= t;
                }
            });
        }
    }
    const yeildGenerator = function (e, t) {
        var n = typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
        if (!n) {
            if (Array.isArray(e) || (n = function (e, t) {
                if (e) {
                    if (typeof e == "string") {
                        return deepHelperCopy(e, t);
                    }
                    var n = {}.toString.call(e).slice(8, -1);
                    if (n === "Object" && e.constructor) {
                        n = e.constructor.name;
                    }
                    if (n === "Map" || n === "Set") {
                        return Array.from(e);
                    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
                        return deepHelperCopy(e, t);
                    } else {
                        return undefined;
                    }
                }
            }(e)) || t && e && typeof e.length == "number") {
                if (n) {
                    e = n;
                }
                var r = 0;
                function o() { }
                return {
                    s: o,
                    n: function () {
                        if (r >= e.length) {
                            return {
                                done: true
                            };
                        } else {
                            return {
                                done: false,
                                value: e[r++]
                            };
                        }
                    },
                    e: function (e) {
                        throw e;
                    },
                    f: o
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var i;
        var a = true;
        var s = false;
        return {
            s: function () {
                n = n.call(e);
            },
            n: function () {
                var e = n.next();
                a = e.done;
                return e;
            },
            e: function (e) {
                s = true;
                i = e;
            },
            f: function () {
                try {
                    if (!a && n.return != null) {
                        n.return();
                    }
                } finally {
                    if (s) {
                        throw i;
                    }
                }
            }
        };
    }
    window.locationAt = function (e, t) {
        return {
            x: e,
            y: 400 - t
        };
    }
    window.locationModifier = function (e, t, n) {
        var r = {
            North: function (t) {
                return {
                    x: t.x,
                    y: t.y - e
                };
            },
            East: function (t) {
                return {
                    x: t.x + e,
                    y: t.y
                };
            },
            South: function (t) {
                return {
                    x: t.x,
                    y: t.y + e
                };
            },
            West: function (t) {
                return {
                    x: t.x - e,
                    y: t.y
                };
            }
        };
        if (n !== undefined && n.x !== undefined && n.y !== undefined && r[t]) {
            return r[t](n);
        }
    }
    window.locationMouse = function () {
        return {
            x: p5Inst.World.mouseX,
            y: p5Inst.World.mouseY
        };
    }
    window.locationOf = function (e) {
        var t = getSpriteArray(e)[0];
        if (t) {
            return {
                x: t.x,
                y: t.y
            };
        }
    }
    window.randomLocation = function () {
        return {
            x: Math.floor(Math.random() * 361) + 20,
            y: Math.floor(Math.random() * 361) + 20
        };
    }
    window.atTime = function (e, t, n) {
        addEvent("atTime", {
            n: e,
            unit: t
        }, n);
    }
    window.checkTouching = function (e, t, n, r) {
        if (e === "when" || e === "while") {
            addEvent(e + "touch", {
                sprite1: t,
                sprite2: n
            }, r);
        }
    }
    const collectData = function (e) {
        addEvent("collectData", {}, e);
    }
    const everyInterval = function (e, t, n) {
        var r = Math.round(e);
        addEvent("everyInterval", {
            n: r,
            unit: t
        }, n);
    }
    window.keyPressed = function (e, t, n) {
        if (e === "when" || e === "while") {
            addEvent(e + "press", {
                key: t
            }, n);
        }
    }
    const repeatForever = function (e) {
        addEvent("repeatForever", {}, e);
    }
    const stopCollectingData = function () {
        clearCollectDataEvents();
    }
    window.spriteClicked = function (e, t, n) {
        if (e === "when" || e === "while") {
            addEvent(e + "click", {
                sprite: t
            }, n);
        }
    }
    window.whenAllPromptsAnswered = function (e) {
        addEvent("whenAllPromptsAnswered", {}, e);
    }
    const whenSpriteCreated = function (e, t) {
        if (e) {
            addEvent("whenSpriteCreated", e, t);
        }
    }
    window.whenPromptAnswered = function (e, t) {
        registerPromptAnswerCallback(e, t);
    }
    window.withPercentChance = function (rate, callback) {
        if (rate <= Math.floor(Math.random() * 100) + 1) { callback() }
    }
    const countByAnimation = function (e) {
        return getSpriteArray(e).length;
    }
    window.destroy = function (e) {
        getSpriteArray(e).forEach(function (e) {
            e.destroy();
            removeAllBehaviors(e);
            removeSpeechBubblesForSprite(e);
            deleteSprite(e.id);
        });
    }
    const displace = function (e, t) {
        var n = getSpriteArray(e);
        var r = getSpriteArray(t);
        n.forEach(function (e) {
            r.forEach(function (t) {
                return e.displace(t);
            });
        });
    }
    window.getProp = function (e, t) {
        var n = getSpriteArray(e)[0];
        if (n !== undefined) {
            if (t === "scale") {
                return n.getScale() * 100;
            } else if (t === "costume") {
                return n.getAnimationLabel();
            } else if (t === "y") {
                return 400 - n.y;
            } else if (t === "velocityY") {
                return -n.velocityY;
            } else {
                return n[t];
            }
        }
    }
    const getThisSprite = function (e, t) {
        if (t) {
            if (e === "this") {
                if (t.clickedSprite !== undefined) {
                    return {
                        id: t.clickedSprite
                    };
                }
                if (t.subjectSprite !== undefined) {
                    return {
                        id: t.subjectSprite
                    };
                }
            }
            if (e === "other") {
                return {
                    id: t.objectSprite
                };
            }
        }
    }
    window.createNewSprite = function (e, t, n) {
        return addSprite({
            name: e.name,
            animation: t,
            location: n
        });
    }
    window.makeNewSpriteAnon = function (e, t) {
        return addSprite({
            animation: e,
            location: t
        });
    }
    const makeNewGroupSprite = function (e, t, n) {
        return addSprite({
            animation: e,
            group: t,
            location: n
        });
    }
    window.makeNumSprites = function (e, t) {
        if (!reachedSpriteMax()) {
            if (reachedSpriteWarningThreshold()) {
                dispatchSpriteLimitWarning();
            }
            for (var n = getMaxAllowedNewSprites(e), r = 0; r < n; r++) {
                addSprite({
                    animation: t,
                    location: randomLocation()
                });
            }
        }
    }
    const makeEnvironmentSprites = function (e, t, n) {
        var r = APP_HEIGHT / n.length;
        for (var o = 0; o < n.length; o++) {
            for (var a = 0; a < n[0].length; a++) {
                if (n[a][o]) {
                    var s = {
                        x: r / 2 + r * o,
                        y: r / 2 + r * a
                    };
                    addSprite({
                        animation: e,
                        group: t,
                        location: s,
                        scale: r,
                        minimumScale: 1
                    });
                }
            }
        }
    }
    window.makeBurst = function (e, t, n) {
        if (!reachedSpriteMax()) {
            if (reachedSpriteWarningThreshold()) {
                dispatchSpriteLimitWarning();
            }
            for (var r = getMaxAllowedNewSprites(e), i = {
                burst: burstFunc,
                pop: popFunc,
                rain: rainFunc,
                spiral: spiralFunc
            }, a = randomInt(0, 359), l = 0; l < r; l++) {
                var u = {};
                switch (n) {
                    case "burst":
                        u = {
                            animation: t,
                            speed: randomInt(10, 20),
                            scale: 1,
                            direction: randomInt(0, 359),
                            rotation: randomInt(0, 359),
                            delay: randomInt(1, 21),
                            lifetime: 60
                        };
                        break;
                    case "pop":
                        u = {
                            animation: t,
                            speed: randomInt(10, 25),
                            scale: 50,
                            direction: randomInt(225, 315),
                            location: {
                                x: randomInt(0, 400),
                                y: randomInt(450, 500)
                            },
                            lifetime: 60
                        };
                        break;
                    case "rain":
                        u = {
                            animation: t,
                            speed: 0,
                            scale: 50,
                            location: {
                                x: randomInt(0, 400),
                                y: randomInt(-125, -25)
                            },
                            rotation: randomInt(-10, 10),
                            lifetime: 60
                        };
                        break;
                    case "spiral":
                        u = {
                            animation: t,
                            scale: 1,
                            initialAngle: l * 360 / e - (l + 1) % 2 * 180 + a,
                            delay: l * 30 / e,
                            lifetime: 90
                        };
                }
                u.group = "effects";
                var c = addSprite(u);
                var d = getSpriteArray({
                    id: c
                })[0];
                addBehavior(d, {
                    func: i[n].apply(this),
                    name: n
                });
            }
        }
    }
    window.setAnimation = function (e, t) {
        getSpriteArray(e).forEach(function (e) {
            e.setAnimation(t);
            e.scale /= e.baseScale;
            e.baseScale = 100 / Math.max(100, e.animation.getHeight(), e.animation.getWidth());
            e.scale *= e.baseScale;
        });
    }
    const makeNewSpriteGroup = function (e, t, n) {
        var r = [];
        for (var o = 0; o < e; o++) {
            var i = addSprite({
                animation: t
            });
            r = r.concat(getSpriteArray({
                id: i
            }));
        }
        (0, layoutSpriteGroup)(r, n, p5Inst);
    }
    window.makeSpritesGridInput = function (animation, layout) {
        if (layout !== undefined && layout.constructor === Array) {
            makeEnvironmentSprites(animation, '', layout);
        }
    }
    window.comment = function (e) { }
    const drawTitle = function () {
        p5Inst.fill("black");
        p5Inst.stroke("white");
        p5Inst.strokeWeight(3);
        p5Inst.textAlign(p5Inst.CENTER, p5Inst.CENTER);
        p5Inst.textSize(50);
        p5Inst.text(screenText.title, 0, 0, 400, 200);
        p5Inst.textSize(35);
        p5Inst.text(screenText.subtitle, 0, 200, 400, 200);
    }
    const getTime = function (e) {
        if (e === "seconds") {
            return getUnpausedWorldTime() - timerResetTime.seconds || 0;
        } else {
            return e === "frames" && p5Inst.World.frameCount - timerResetTime.frames || 0;
        }
    }
    window.resetTimer = function () {
        timerResetTime.seconds = getUnpausedWorldTime();
        timerResetTime.frames = currentFrame();
    }
    window.hideTitleScreen = function () {
        screenText = {};
    }
    const fixPath = function (t) {
        o = "//" + location.host + "/media?u=";
        a = new RegExp("^https?://", "i");
        u = new RegExp("^https://curriculum.code.org/", "i");
        s = new RegExp("^https://images.code.org/", "i");
        p = new RegExp("^sound://");
        if (a.test(t) && "file:" !== window.location.protocol) return u.test(t) || s.test(t) ? t : o + encodeURIComponent(t.replace(/ /g, "%20"));
        if (0 === (t = t || "").length) return "/blockly/media/1x1.gif";
        if (p.test(t)) return t.replace("sound://", `/media?u=https://studio.code.org/api/v1/sound-library/`);
        if (-1 !== t.indexOf("/") || !_) return t;
        return "assets/" + encodeURIComponent(t)
    }
    window.playSound = function (url) {
        var t = typeof url === "string";
        if (t) {
            var o = fixPath(url);
            var a = new Audio(o);
            if (audioUnlocked) {
                a.play();
            } else {
                soundLog.push(a);
            }
            return a;
        }
    }
    window.printText = function (e) {
        printLog.push(e);
        if (printLog.length > MAX_NUM_TEXTS) {
            printLog.shift();
        }
        console.log(e);
    }
    const setBackgroundImage = function (e) {
        if (p5Inst._preloadedBackgrounds && p5Inst._preloadedBackgrounds[e]) {
            var t = p5Inst._preloadedBackgrounds[e];
            t.name = e;
            setBackground(t);
        }
    }
    window.setBackgroundImageAs = function (e) {
        if (p5Inst._predefinedSpriteAnimations && p5Inst._predefinedSpriteAnimations[e]) {
            var t = p5Inst._predefinedSpriteAnimations[e];
            t.name = e;
            setBackground(t);
        }
    }
    const addTextPrompt = function (promptText, variableName) {
        var answer = prompt(promptText);
        setTimeout(onPromptAnswer.bind(this, variableName, answer), 1)
    }
    const addMultipleChoicePrompt = function (e, t, r) {
        var choice;
        var choices = "";
        for (var i = 0; i < r.length; i++) {
            choices += `\n${i + 1}: ${r[i]}`;
        }
        while (!r.includes(choice)) {
            choice = prompt(e + choices);
            if (Number.isInteger(parseInt(choice)) && choice >= 1 && choice <= choices.length) {
                choice = r[choice - 1];
                break;
            }
        }
        setTimeout(onPromptAnswer.bind(this, t, choice), 1)
    }
    const registerPrompt = function (e, t, n) {
        numActivePrompts++;
        if (t) {
            if (promptVars[t] === undefined) {
                promptVars[t] = null;
            }
            userInputEventCallbacks[t] ||= {
                setterCallbacks: [],
                userCallbacks: []
            };
            userInputEventCallbacks[t].setterCallbacks.push(n);
        }
    }
    const registerPromptAnswerCallback = function (e, t) {
        if (e) {
            userInputEventCallbacks[e] ||= {
                setterCallbacks: [],
                userCallbacks: []
            };
            userInputEventCallbacks[e].userCallbacks.push(t);
        }
    }
    const onPromptAnswer = function (e, t) {
        numActivePrompts--;
        var n = isNaN(parseFloat(t)) ? t : parseFloat(t);
        promptVars[e] = n;
        var r = userInputEventCallbacks[e];
        if (r) {
            r.setterCallbacks.forEach(function (e) {
                e(n);
            });
            r.userCallbacks.forEach(function (e) {
                e();
            });
        }
    }
    window.setPrompt = function (e, t, n) {
        registerPrompt(e, t, n);
        (0, addTextPrompt(e, t));
    }
    window.setPromptWithChoices = function (e, t, n, r, a, s) {
        registerPrompt(e, t, s);
        (0, addMultipleChoicePrompt(e, t, [n, r, a]));
    }
    window.showTitleScreen = function (e, t) {
        screenText = {
            title: e || "",
            subtitle: t || ""
        };
    }
    window.textJoin = function (e, t) {
        return [e, t].join("");
    }
    window.textVariableJoin = function (e, t) {
        return [e, t].join("");
    }
    const truncateText = function (text, maxWidth, textSize) {
        let ellipsis = '...';
        let textWidth = getTextWidth(text, textSize);

        if (textWidth <= maxWidth) {
            return text;
        }

        const ellipsisWidth = getTextWidth(ellipsis, textSize);
        maxWidth -= ellipsisWidth;

        let truncatedText = text;
        while (textWidth > maxWidth && truncatedText.length > 1) {
            truncatedText = truncatedText.slice(0, -1);
            textWidth = getTextWidth(truncatedText, textSize);
        }

        return truncatedText + ellipsis;
    }
    let gesture = () => {
        audioUnlocked = true;
        for (let audio of soundLog) { audio.play() }
        document.removeEventListener("mousedown", gesture, true)
    }
    document.addEventListener("mousedown", gesture, true)
})();