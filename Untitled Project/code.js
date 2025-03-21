
var p5Inst = new p5(null, 'sketch');
var my_1_o3l_7B__7DR_7DiNSYVARcd_;
window.preload = function () {
  // scaler
  const element = document.getElementById("sketch")
  function rescale() {
    element.style["transform"] = "scale(" + (Math.min(window.innerWidth, window.innerHeight) / 400) + ")";
  }
  rescale();
  window.onresize = rescale;
  document.onclick = () => {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    }
  }
  element.style["transform-origin"] = "top left";

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = { "orderedKeys": ["046a0340-7585-4ae7-b1a3-e684e6343e33", "d89a28b9-6919-424b-b842-3bd4108d5ebf", "018b25d3-0a8d-4658-8237-c2862d1d101d", "fba0fec1-54c3-4d11-b306-12eb2d0eed85", "f95cf0c8-62f3-48db-a70c-40c276b7dbfb", "74fcf2b4-8f22-4e05-9805-4fc6b7a25cc7", "c8c169f9-c3ae-4a85-ba45-825d4df0919d", "ce1a2bf3-c812-483e-9f60-6ad0854a2714", "740d43fe-7ee2-45d3-8f81-cfefb3bb6be3", "df3e46c7-6e29-4ec2-b427-1f42f67424ec", "4efb5d32-ecf8-4b12-9b10-f3547e4e15f6", "d45827a1-a1de-492b-b957-70d3f6c17034", "b19ec492-a434-4e19-be34-894e3cb60379", "83003b1b-8da6-42f0-a8f1-157fc47bb6d6", "a0622ddb-fd0e-4004-b692-e155ceaea4fc", "d3e1da1b-366a-4db1-b1fa-160769877c38", "2b73748c-a84d-4aa3-856c-b5b8359720d1", "0f781096-a9d9-4f08-9cf4-c67fd3fb1600", "0475883d-90b8-4040-949e-e0d3246e709c", "01525212-f75c-4a34-9d4a-7ac28b94b5af", "fd02220a-f848-4f8d-83f5-1dcb74c47947", "adbd19d4-e969-47c1-8f5c-2e97454f2bce", "73c6bb7b-6e78-4fdb-87f2-1622283bba39", "313551cd-933b-40ee-92ac-7e8296f6fd88", "84777fbb-0158-4c58-bbff-c0b972f68d3b", "a8f6bc24-dee1-4c61-8338-af13074fe1a3", "f7767559-7445-43a7-a899-41958b986289", "27fca8dc-836f-4714-a474-1241e952b570", "0906cce9-3817-4289-b15b-9ba540f0f4f2", "374edbad-dc4d-4a81-81c4-d1bbdc5a1806", "d4fdf6c7-9d0a-45a1-b7fc-bc253bf74788", "4c1bf0a1-7563-4e86-ad58-71f16b624870", "921f20b2-e5d4-4cdf-9a68-09d45e8d394d", "addbd54f-4a37-4cf3-a79e-0f320cc504d1", "8343c910-0361-4e7a-95aa-1a66283874d6", "dbe122f9-6df2-497d-9da7-35f2a3db28cb", "7334d0a2-a8b9-4c0c-ba59-26472fb11a1c", "c1c9ac9c-649f-4b48-9ff6-8bfd9f4a410a", "4360d0eb-9b1f-4386-9a6c-bf7a47d4f23b", "7ea68e48-7b8b-4933-bbd1-7b1129fddd4a", "127fcf48-780a-4be6-82c7-97c2259a910c", "8f09f5ba-0993-441d-8777-5235da7940bc", "2cf42e07-9aa7-40e0-b085-f3c4bb2b4267", "0773edd6-f7c5-4576-be5e-521dead781d3", "f4f606ff-4f74-4df0-a2f0-cbae8ac37400", "5ae47348-88e8-4ab2-8000-51adfe65d362", "9c11ceb4-047c-48d3-a024-83b7ad6fcd20", "7c14cfbd-e57a-47ac-ad90-cbe10dc2815e", "2be15af7-474a-4e61-b3bd-fee240004892", "79485a3e-4b78-4efb-8d5e-493f8836edcb", "1878640f-9c18-4b3d-82db-48c1c9b52c7c", "7c5beab7-976d-43e7-9e46-2f476b06ca04", "fd9d758d-15be-4b93-ba6e-175520c17365", "a3475ee1-4694-4ed1-963a-f4ed74b270f9", "31c164eb-e5c8-4eaf-8b01-93e85792a72b", "bbd4e6a2-6b82-4122-8a41-489640654254", "14637143-0a2b-40fe-8a8b-a9c626ff3391", "060cc7fd-8c47-4921-b4df-950ee8843a00", "2b02f063-b859-4115-9f87-79c53b93788a", "a974335c-0c03-4b87-b92a-52382040374a", "b2885501-d391-4c2a-b3de-ffcaa287a385", "deaef2ca-2b32-427d-93da-6db9ab6249d8", "6f78934e-1a41-4854-9666-4e7453b5e4ee", "609f1d26-38e3-4d47-8788-4ad20e33a5dc", "ecfbccbf-13dc-4fa0-bbc1-627394c194bc", "0b823ef2-57f2-4ee2-bd87-0883ecfb2a37", "1f4b0017-8384-43ba-9892-41af1bc33f1a"], "propsByKey": { "046a0340-7585-4ae7-b1a3-e684e6343e33": { "name": "npfp.png_1", "sourceUrl": "assets/v3/animations/lq1TjodP6XWmppleOYN8t6engbvvzDyemt-YOgWi0R0/046a0340-7585-4ae7-b1a3-e684e6343e33.png", "frameSize": { "x": 250, "y": 244 }, "frameCount": 1, "looping": true, "frameDelay": 4, "version": "hzJR9CsKyKZpxaC4cSZ29uVljUkWkpeB", "categories": [""], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 250, "y": 244 }, "rootRelativePath": "assets/v3/animations/lq1TjodP6XWmppleOYN8t6engbvvzDyemt-YOgWi0R0/046a0340-7585-4ae7-b1a3-e684e6343e33.png" }, "d89a28b9-6919-424b-b842-3bd4108d5ebf": { "name": "bear", "sourceUrl": "assets/d89a28b9-6919-424b-b842-3bd4108d5ebf.png", "frameSize": { "x": 254, "y": 333 }, "frameCount": 1, "looping": true, "frameDelay": 12, "version": "zPfJqtpLB9aSjMhPZOXG7pufU51kDpaU", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 254, "y": 333 }, "rootRelativePath": "assets/d89a28b9-6919-424b-b842-3bd4108d5ebf.png" }, "018b25d3-0a8d-4658-8237-c2862d1d101d": { "name": "bee", "sourceUrl": "assets/category_animals/bee.png", "frameSize": { "x": 62, "y": 50 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "b2QZ1J9ww5XYdjExrVb7lWgP2q6Gfx1C", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 62, "y": 50 }, "rootRelativePath": "assets/category_animals/bee.png" }, "fba0fec1-54c3-4d11-b306-12eb2d0eed85": { "name": "brown bunny", "sourceUrl": "assets/category_animals/bunny1_ready.png", "frameSize": { "x": 120, "y": 191 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "uPIxfWA_cXFQ3rZjtIfd5beAWtSMrP1l", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 120, "y": 191 }, "rootRelativePath": "assets/category_animals/bunny1_ready.png" }, "f95cf0c8-62f3-48db-a70c-40c276b7dbfb": { "name": "purple bunny", "sourceUrl": "assets/category_animals/bunny2.png", "frameSize": { "x": 152, "y": 193 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "kBiszeGACcLTGTrqmS4laPVQKPGQnDln", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 152, "y": 193 }, "rootRelativePath": "assets/category_animals/bunny2.png" }, "74fcf2b4-8f22-4e05-9805-4fc6b7a25cc7": { "name": "corgi", "sourceUrl": "assets/category_animals/corgi.png", "frameSize": { "x": 542, "y": 500 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "NryAhw2GZwG1wrqogiksIE5dnroHxPn2", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 542, "y": 500 }, "rootRelativePath": "assets/category_animals/corgi.png" }, "c8c169f9-c3ae-4a85-ba45-825d4df0919d": { "name": "cow", "sourceUrl": "assets/category_animals/cow.png", "frameSize": { "x": 265, "y": 300 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "qs4BusJJrGAhXupGXNZ0EWlLBM_8s1i0", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 265, "y": 300 }, "rootRelativePath": "assets/category_animals/cow.png" }, "ce1a2bf3-c812-483e-9f60-6ad0854a2714": { "name": "crab", "sourceUrl": "assets/category_animals/crab.png", "frameSize": { "x": 288, "y": 191 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "aUGoWCStMRK1HP3USAg5q8WMQ4.SFSCb", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 288, "y": 191 }, "rootRelativePath": "assets/category_animals/crab.png" }, "740d43fe-7ee2-45d3-8f81-cfefb3bb6be3": { "name": "elephant", "sourceUrl": "assets/category_animals/elephant2.png", "frameSize": { "x": 99, "y": 97 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "jK3q6UNbOMNbaiWBwclkhL3D8isE1cLQ", "categories": [], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 99, "y": 97 }, "rootRelativePath": "assets/category_animals/elephant2.png" }, "df3e46c7-6e29-4ec2-b427-1f42f67424ec": { "name": "fish", "sourceUrl": "assets/category_animals/fish.png", "frameSize": { "x": 128, "y": 128 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "CwVno2kER.r_tECMOL4D4YL.lcaFNv7h", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 128, "y": 128 }, "rootRelativePath": "assets/category_animals/fish.png" }, "4efb5d32-ecf8-4b12-9b10-f3547e4e15f6": { "name": "hippo", "sourceUrl": "assets/category_animals/hippo_gray.png", "frameSize": { "x": 243, "y": 300 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "iAlFfj4qkc8EFnaXb.NaEB9CrFuIPUpU", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 243, "y": 300 }, "rootRelativePath": "assets/category_animals/hippo_gray.png" }, "d45827a1-a1de-492b-b957-70d3f6c17034": { "name": "ladybug", "sourceUrl": "assets/category_animals/ladybug.png", "frameSize": { "x": 63, "y": 36 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "BF9M9h767oyE2PE2u8uCA2pDQzJG19ji", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 63, "y": 36 }, "rootRelativePath": "assets/category_animals/ladybug.png" }, "b19ec492-a434-4e19-be34-894e3cb60379": { "name": "mouse", "sourceUrl": "assets/category_animals/mouse.png", "frameSize": { "x": 61, "y": 37 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "sTV_ECoTPZ4e322cfbiihNiMroU13hpD", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 61, "y": 37 }, "rootRelativePath": "assets/category_animals/mouse.png" }, "83003b1b-8da6-42f0-a8f1-157fc47bb6d6": { "name": "pig", "sourceUrl": "assets/category_animals/pig.png", "frameSize": { "x": 288, "y": 257 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "4QaWtU6QEp0soGYlMP9OX1ar5HXuR8M5", "categories": ["animals"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 288, "y": 257 }, "rootRelativePath": "assets/category_animals/pig.png" }, "a0622ddb-fd0e-4004-b692-e155ceaea4fc": { "name": "bell", "sourceUrl": "assets/category_school_objects/bell.png", "frameSize": { "x": 85, "y": 100 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "8q9eGNVhqpBSqMVOJM6k1CQuf2PEqpKj", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 85, "y": 100 }, "rootRelativePath": "assets/category_school_objects/bell.png" }, "d3e1da1b-366a-4db1-b1fa-160769877c38": { "name": "book", "sourceUrl": "assets/category_school_objects/book.png", "frameSize": { "x": 109, "y": 125 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "oALN3b_kkf2.OwdAJgv8aaOMnj4U8isD", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 109, "y": 125 }, "rootRelativePath": "assets/category_school_objects/book.png" }, "2b73748c-a84d-4aa3-856c-b5b8359720d1": { "name": "compass", "sourceUrl": "assets/category_school_objects/compass.png", "frameSize": { "x": 105, "y": 79 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "qvBiypAwvrpDN_5gkD7ruSJQO5_.84rq", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 105, "y": 79 }, "rootRelativePath": "assets/category_school_objects/compass.png" }, "0f781096-a9d9-4f08-9cf4-c67fd3fb1600": { "name": "computer monitor", "sourceUrl": "assets/category_school_objects/computer_monitor.png", "frameSize": { "x": 136, "y": 129 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "0fk9d3v5JrrIXv9ISZYvXYNWCqt26mnC", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 136, "y": 129 }, "rootRelativePath": "assets/category_school_objects/computer_monitor.png" }, "0475883d-90b8-4040-949e-e0d3246e709c": { "name": "first aid kit", "sourceUrl": "assets/category_school_objects/first_aid.png", "frameSize": { "x": 117, "y": 117 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "iyEBFtIPcgsKEk2sBNhllN_B5YMRuwll", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 117, "y": 117 }, "rootRelativePath": "assets/category_school_objects/first_aid.png" }, "01525212-f75c-4a34-9d4a-7ac28b94b5af": { "name": "keys", "sourceUrl": "assets/category_household_objects/keys.png", "frameSize": { "x": 94, "y": 73 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "BeGJdva_2245T7z1chI.Se9xCtYQoRh4", "categories": ["household_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 94, "y": 73 }, "rootRelativePath": "assets/category_household_objects/keys.png" }, "fd02220a-f848-4f8d-83f5-1dcb74c47947": { "name": "money", "sourceUrl": "assets/category_household_objects/money.png", "frameSize": { "x": 101, "y": 106 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "b9cbPrECsNr9WLFt28uBxg7.e0VKrGG8", "categories": ["household_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 101, "y": 106 }, "rootRelativePath": "assets/category_household_objects/money.png" }, "adbd19d4-e969-47c1-8f5c-2e97454f2bce": { "name": "paint pallette", "sourceUrl": "assets/category_school_objects/paint_pallette.png", "frameSize": { "x": 116, "y": 96 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "y4D3qb.z.cY35hPZ38rkoiXyyEdMcupJ", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 116, "y": 96 }, "rootRelativePath": "assets/category_school_objects/paint_pallette.png" }, "73c6bb7b-6e78-4fdb-87f2-1622283bba39": { "name": "potion", "sourceUrl": "assets/category_school_objects/flask.png", "frameSize": { "x": 60, "y": 112 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "HN7leyQAp6nLD9.DDsaZG1MiWoCNLfS8", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 60, "y": 112 }, "rootRelativePath": "assets/category_school_objects/flask.png" }, "313551cd-933b-40ee-92ac-7e8296f6fd88": { "name": "tablet", "sourceUrl": "assets/category_school_objects/tablet.png", "frameSize": { "x": 84, "y": 98 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "T0.iJtdIQ9TqQL_AZ2NSn._6U_bBsYzo", "categories": ["school_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 84, "y": 98 }, "rootRelativePath": "assets/category_school_objects/tablet.png" }, "84777fbb-0158-4c58-bbff-c0b972f68d3b": { "name": "teapot", "sourceUrl": "assets/category_household_objects/teapot.png", "frameSize": { "x": 152, "y": 116 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "YzMJfILZOx7iEIwXKBd5fD.sqdjSTagp", "categories": ["household_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 152, "y": 116 }, "rootRelativePath": "assets/category_household_objects/teapot.png" }, "a8f6bc24-dee1-4c61-8338-af13074fe1a3": { "name": "boat", "sourceUrl": "assets/category_vehicles/boat.png", "frameSize": { "x": 128, "y": 128 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "l90Q4TyT9AYRWsk2K7.EOKFj4YZuzQ6Y", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 128, "y": 128 }, "rootRelativePath": "assets/category_vehicles/boat.png" }, "f7767559-7445-43a7-a899-41958b986289": { "name": "black car", "sourceUrl": "assets/category_vehicles/car_black.png", "frameSize": { "x": 71, "y": 131 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "luVIruUYlwEjPtNfNl5r4OZdoZ7G6X4_", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 71, "y": 131 }, "rootRelativePath": "assets/category_vehicles/car_black.png" }, "27fca8dc-836f-4714-a474-1241e952b570": { "name": "blue car", "sourceUrl": "assets/category_vehicles/car_blue.png", "frameSize": { "x": 71, "y": 131 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "8AjmPfiAmk2uxRr886F44Z0rvfSONAVp", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 71, "y": 131 }, "rootRelativePath": "assets/category_vehicles/car_blue.png" }, "0906cce9-3817-4289-b15b-9ba540f0f4f2": { "name": "green car", "sourceUrl": "assets/category_vehicles/car_green.png", "frameSize": { "x": 71, "y": 131 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "zxFsR5p7wG6qQeCQYtg9T0bzf4nH0C6E", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 71, "y": 131 }, "rootRelativePath": "assets/category_vehicles/car_green.png" }, "374edbad-dc4d-4a81-81c4-d1bbdc5a1806": { "name": "red car", "sourceUrl": "assets/category_vehicles/car_red.png", "frameSize": { "x": 71, "y": 131 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "i2mTO0SVHOuGETUB_Wd3o76ZTirAZTj5", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 71, "y": 131 }, "rootRelativePath": "assets/category_vehicles/car_red.png" }, "d4fdf6c7-9d0a-45a1-b7fc-bc253bf74788": { "name": "yellow car", "sourceUrl": "assets/category_vehicles/car_yellow.png", "frameSize": { "x": 71, "y": 131 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "9I2siVr152ZIwZRU96O90iMKdhwkCmTH", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 71, "y": 131 }, "rootRelativePath": "assets/category_vehicles/car_yellow.png" }, "4c1bf0a1-7563-4e86-ad58-71f16b624870": { "name": "blue plane", "sourceUrl": "assets/category_vehicles/planeBlue1.png", "frameSize": { "x": 88, "y": 73 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "0q6bUTWJ_lTtMECnYb1lUW8nuvBPwRwP", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 88, "y": 73 }, "rootRelativePath": "assets/category_vehicles/planeBlue1.png" }, "921f20b2-e5d4-4cdf-9a68-09d45e8d394d": { "name": "red plane", "sourceUrl": "assets/category_vehicles/planeRed1.png", "frameSize": { "x": 88, "y": 73 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "9jHbEP7PZTqsdsdMIX10zAFrRWWMukp_", "categories": ["vehicles"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 88, "y": 73 }, "rootRelativePath": "assets/category_vehicles/planeRed1.png" }, "addbd54f-4a37-4cf3-a79e-0f320cc504d1": { "name": "blue alien", "sourceUrl": "assets/category_fantasy/alienBlue.png", "frameSize": { "x": 66, "y": 92 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "2rGSyQzhR7JKaUlmkE4Pqk9FnrB3GMBp", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 66, "y": 92 }, "rootRelativePath": "assets/category_fantasy/alienBlue.png" }, "8343c910-0361-4e7a-95aa-1a66283874d6": { "name": "green alien", "sourceUrl": "assets/category_fantasy/alienGreen.png", "frameSize": { "x": 66, "y": 92 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "LzqjT3ovSLMimxqSiV7d7EL7blVgVCKS", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 66, "y": 92 }, "rootRelativePath": "assets/category_fantasy/alienGreen.png" }, "dbe122f9-6df2-497d-9da7-35f2a3db28cb": { "name": "pink alien", "sourceUrl": "assets/category_fantasy/alienPink.png", "frameSize": { "x": 66, "y": 92 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "NKXPkpcoLejBHbxfBb8RNNgX0NhWKxat", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 66, "y": 92 }, "rootRelativePath": "assets/category_fantasy/alienPink.png" }, "7334d0a2-a8b9-4c0c-ba59-26472fb11a1c": { "name": "yellow alien", "sourceUrl": "assets/category_fantasy/alienYellow.png", "frameSize": { "x": 66, "y": 82 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "ZUC_qXA12dYpnVoYfo5gyCyZjug.0gKl", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 66, "y": 82 }, "rootRelativePath": "assets/category_fantasy/alienYellow.png" }, "c1c9ac9c-649f-4b48-9ff6-8bfd9f4a410a": { "name": "ghost", "sourceUrl": "assets/category_fantasy/ghost.png", "frameSize": { "x": 51, "y": 73 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "T5TXG0oYdc7u_wn6lZDqfSj3lDJTmH5g", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 51, "y": 73 }, "rootRelativePath": "assets/category_fantasy/ghost.png" }, "4360d0eb-9b1f-4386-9a6c-bf7a47d4f23b": { "name": "orange monster", "sourceUrl": "assets/category_fantasy/orange_monster.png", "frameSize": { "x": 240, "y": 300 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "n.NppEK5iJcQSCFWTONpgJCntGlAN18f", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 240, "y": 300 }, "rootRelativePath": "assets/category_fantasy/orange_monster.png" }, "7ea68e48-7b8b-4933-bbd1-7b1129fddd4a": { "name": "green monster", "sourceUrl": "assets/category_fantasy/happy_critter.png", "frameSize": { "x": 262, "y": 300 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "A83TX2i7Ua.aVSvoVLZX6XtSho6TgUth", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 262, "y": 300 }, "rootRelativePath": "assets/category_fantasy/happy_critter.png" }, "127fcf48-780a-4be6-82c7-97c2259a910c": { "name": "purple monster", "sourceUrl": "assets/category_fantasy/purple_monster.png", "frameSize": { "x": 280, "y": 290 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "xcWHkGi9zvgvmkvTmipYRKk9GomYggqL", "categories": ["fantasy"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 280, "y": 290 }, "rootRelativePath": "assets/category_fantasy/purple_monster.png" }, "8f09f5ba-0993-441d-8777-5235da7940bc": { "name": "cloud", "sourceUrl": "assets/category_video_games/cloud.png", "frameSize": { "x": 260, "y": 134 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "kJ0LyQ6LhFPSdnezA1eW_kyY4Iw6pw0p", "categories": ["video_games"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 260, "y": 134 }, "rootRelativePath": "assets/category_video_games/cloud.png" }, "2cf42e07-9aa7-40e0-b085-f3c4bb2b4267": { "name": "rock", "sourceUrl": "assets/category_video_games/rock.png", "frameSize": { "x": 128, "y": 128 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "oT0lz__domka0S8pJh2AFLWDvIgS9cBI", "categories": ["video_games"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 128, "y": 128 }, "rootRelativePath": "assets/category_video_games/rock.png" }, "0773edd6-f7c5-4576-be5e-521dead781d3": { "name": "sun", "sourceUrl": "assets/category_video_games/sun.png", "frameSize": { "x": 150, "y": 150 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "vNOgdjokqVZiCJ1by9gqSD2MEZuT_RJR", "categories": ["video_games"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 150, "y": 150 }, "rootRelativePath": "assets/category_video_games/sun.png" }, "f4f606ff-4f74-4df0-a2f0-cbae8ac37400": { "name": "apple", "sourceUrl": "assets/category_food/apple.png", "frameSize": { "x": 128, "y": 128 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "Y2ZLBotauBrpviHjXXeeaLsV5eW.I1P1", "categories": ["food"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 128, "y": 128 }, "rootRelativePath": "assets/category_food/apple.png" }, "5ae47348-88e8-4ab2-8000-51adfe65d362": { "name": "carrot", "sourceUrl": "assets/category_food/carrot.png", "frameSize": { "x": 78, "y": 70 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "QfIbb_F.hhLm1oJ6aZdVnStJLi2GS3Su", "categories": ["food"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 78, "y": 70 }, "rootRelativePath": "assets/category_food/carrot.png" }, "9c11ceb4-047c-48d3-a024-83b7ad6fcd20": { "name": "cupcake", "sourceUrl": "assets/category_food/cupcake.png", "frameSize": { "x": 283, "y": 300 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "hburm5mTvZjdWIQTr4rmYlbvEopO4LvD", "categories": ["food"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 283, "y": 300 }, "rootRelativePath": "assets/category_food/cupcake.png" }, "7c14cfbd-e57a-47ac-ad90-cbe10dc2815e": { "name": "mushroom", "sourceUrl": "assets/category_food/mushroom_red.png", "frameSize": { "x": 81, "y": 99 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "GJHXAsRaI0d3.ta64NgAn3Cj2GPxK5hc", "categories": ["food"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 81, "y": 99 }, "rootRelativePath": "assets/category_food/mushroom_red.png" }, "2be15af7-474a-4e61-b3bd-fee240004892": { "name": "watermelon", "sourceUrl": "assets/category_food/sliced_watermelon.png", "frameSize": { "x": 300, "y": 240 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "aWUKhcSNAFgq2tnir70Tesmy0lTr95Mt", "categories": ["food"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 300, "y": 240 }, "rootRelativePath": "assets/category_food/sliced_watermelon.png" }, "79485a3e-4b78-4efb-8d5e-493f8836edcb": { "name": "gold coin", "sourceUrl": "assets/category_board_games_and_cards/coin_gold.png", "frameSize": { "x": 61, "y": 61 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "DND7UUQ54JJXqwZomylZBnmahjzE2l3N", "categories": ["board_games_and_cards"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 61, "y": 61 }, "rootRelativePath": "assets/category_board_games_and_cards/coin_gold.png" }, "1878640f-9c18-4b3d-82db-48c1c9b52c7c": { "name": "silver coin", "sourceUrl": "assets/category_board_games_and_cards/coin_silver.png", "frameSize": { "x": 61, "y": 61 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "8yEe8mfXrESbJsERdn3BptF1zwBtsQx.", "categories": ["board_games_and_cards"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 61, "y": 61 }, "rootRelativePath": "assets/category_board_games_and_cards/coin_silver.png" }, "7c5beab7-976d-43e7-9e46-2f476b06ca04": { "name": "target", "sourceUrl": "assets/category_board_games_and_cards/target_red3_outline.png", "frameSize": { "x": 142, "y": 142 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "KXfOrZbsyB6ivBfs5VriDDVlGYph0XUN", "categories": ["board_games_and_cards"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 142, "y": 142 }, "rootRelativePath": "assets/category_board_games_and_cards/target_red3_outline.png" }, "fd9d758d-15be-4b93-ba6e-175520c17365": { "name": "cactus", "sourceUrl": "assets/category_video_games/cactus.png", "frameSize": { "x": 117, "y": 160 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "xwiz_SqVZ8jGaLK6TPJ8iXPrSvGvvf9o", "categories": ["video_games"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 117, "y": 160 }, "rootRelativePath": "assets/category_video_games/cactus.png" }, "a3475ee1-4694-4ed1-963a-f4ed74b270f9": { "name": "wheat", "sourceUrl": "assets/category_video_games/wheat.png", "frameSize": { "x": 128, "y": 128 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "IYyVUgsI9mXMCoxR1hNQjDAqk8H73De.", "categories": ["video_games"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 128, "y": 128 }, "rootRelativePath": "assets/category_video_games/wheat.png" }, "31c164eb-e5c8-4eaf-8b01-93e85792a72b": { "name": "soap", "sourceUrl": "assets/category_household_objects/soap.png", "frameSize": { "x": 382, "y": 387 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "jWsRREUs0JdsYR.zhqcXzMrcU2x8Q_X3", "categories": ["household_objects"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 382, "y": 387 }, "rootRelativePath": "assets/category_household_objects/soap.png" }, "bbd4e6a2-6b82-4122-8a41-489640654254": { "name": "cave", "sourceUrl": "assets/category_backgrounds/background_cave.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "_ulBIZmnwGm9qoHNQ8AieRYAc3yD0g8x", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_cave.png" }, "14637143-0a2b-40fe-8a8b-a9c626ff3391": { "name": "court", "sourceUrl": "assets/category_backgrounds/background_court.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "DNsD9Ixj1NTj7XFmOF6N.cdvSQZAB4ny", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_court.png" }, "060cc7fd-8c47-4921-b4df-950ee8843a00": { "name": "desert", "sourceUrl": "assets/category_backgrounds/background_desert.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "mDekh2TfXKz930Gub4zFK.0pIG_.Zn9i", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_desert.png" }, "2b02f063-b859-4115-9f87-79c53b93788a": { "name": "grid", "sourceUrl": "assets/category_backgrounds/background_grid.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "L5A9oBn2qdFNAsfGkqGOxWon837dlpa8", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_grid.png" }, "a974335c-0c03-4b87-b92a-52382040374a": { "name": "rainbow", "sourceUrl": "assets/category_backgrounds/background_rainbow.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "HmpZEM89bYOmDpEROTLOn1WQrtDW8D06", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_rainbow.png" }, "b2885501-d391-4c2a-b3de-ffcaa287a385": { "name": "sci_fi", "sourceUrl": "assets/category_backgrounds/background_scifi.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "0qaMBfuUPDzY7TO.DacrNIBod8CUquPT", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_scifi.png" }, "deaef2ca-2b32-427d-93da-6db9ab6249d8": { "name": "space", "sourceUrl": "assets/category_backgrounds/background_space.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "Wa3zL3ClrMq9ZRuoVgZc4CjiMVWkM2sY", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_space.png" }, "6f78934e-1a41-4854-9666-4e7453b5e4ee": { "name": "underwater", "sourceUrl": "assets/category_backgrounds/background_underwater.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "N6hAaLpD2XfNOPQVk4Noa7.0mYvp5z08", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/background_underwater.png" }, "609f1d26-38e3-4d47-8788-4ad20e33a5dc": { "name": "city", "sourceUrl": "assets/category_backgrounds/city.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "y6BGeFgxDxUvB9CInurWN.hxPWqJI85W", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/city.png" }, "ecfbccbf-13dc-4fa0-bbc1-627394c194bc": { "name": "floating_grass", "sourceUrl": "assets/category_backgrounds/floating_grass.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "Ow7yG7PW6U7_wIXYsVgE_GQ63NGYMFAQ", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/floating_grass.png" }, "0b823ef2-57f2-4ee2-bd87-0883ecfb2a37": { "name": "living_room", "sourceUrl": "assets/category_backgrounds/living_room.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "fHtqPn7I8AwT6M97bQjxCXC.HnHdJW0a", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/living_room.png" }, "1f4b0017-8384-43ba-9892-41af1bc33f1a": { "name": "stage", "sourceUrl": "assets/category_backgrounds/stage.png", "frameSize": { "x": 400, "y": 400 }, "frameCount": 1, "looping": true, "frameDelay": 2, "version": "dMtM9Rw7FNsOrI1kAgDWUaC6A8lp.x3D", "categories": ["backgrounds"], "loadedFromSource": true, "saved": true, "sourceSize": { "x": 400, "y": 400 }, "rootRelativePath": "assets/category_backgrounds/stage.png" } } }
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = true;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
        image,
        props.frameSize.x,
        props.frameSize.y,
        frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });
  Object.defineProperties(Object.prototype, { apply: { value: function (fn, args) { if (typeof this === "object" && "length" in this) { return Function.prototype.apply.call(this, fn, args) } }, enumerable: false, configurable: true, writable: true }, concat: { value: function () { if (typeof this === "object" && "length" in this) { return Array.prototype.concat.apply(this, arguments) } return [] }, enumerable: false, configurable: true, writable: true }, every: { value: function (cb, _this) { if (typeof this === "object" && "length" in this) { return Array.prototype.every.call(this, cb, _this) } return false }, enumerable: false, configurable: true, writable: true }, indexOf: { value: function (search, fromIndex) { if (typeof this === "object" && "length" in this) { return Array.prototype.indexOf.call(this, search, fromIndex) } return -1 }, enumerable: false, configurable: true, writable: true }, filter: { value: function (cb, _this) { if (typeof this === "object" && "length" in this) { return Array.prototype.filter.call(this, cb, _this) } return [] }, enumerable: false, configurable: true, writable: true }, forEach: { value: function (cb, _this) { if (typeof this === "object" && "length" in this) { return Array.prototype.forEach.call(this, cb, _this) } }, enumerable: false, configurable: true, writable: true }, join: { value: function (separator) { if (typeof this === "object" && "length" in this) { return Array.prototype.join.call(this, separator) } return "" }, enumerable: false, configurable: true, writable: true }, lastIndexOf: { value: function (search, fromIndex) { if (typeof this === "object" && "length" in this) { return Array.prototype.lastIndexOf.call(this, search, fromIndex) } return -1 }, enumerable: false, configurable: true, writable: true }, map: { value: function (cb, _this) { if (typeof this === "object" && "length" in this) { const mapped = []; for (let i in this) { mapped.push(cb.call(_this, this[i], Number(i))) } return mapped } }, enumerable: false, configurable: true, writable: true }, push: { value: function () { if (typeof this === "object" && "length" in this) { return Array.prototype.push.apply(this, arguments) } return 0 }, enumerable: false, configurable: true, writable: true }, pop: { value: function () { if (typeof this === "object" && "length" in this) { return Array.prototype.pop.apply(this) } return undefined }, enumerable: false, configurable: true, writable: true }, reduce: { value: function (cb, startValue) { if (typeof this === "object" && "length" in this) { return Array.prototype.reduce.call(this, cb, startValue) } throw new TypeError("Cannot call reduce on a non-array object") }, enumerable: false, configurable: true, writable: true }, some: { value: function (cb, _this) { if (typeof this === "object" && "length" in this) { return Array.prototype.some.call(this, cb, _this) } return false }, enumerable: false, configurable: true, writable: true }, shift: { value: function () { if (typeof this === "object" && "length" in this) { return Array.prototype.shift.call(this) } return undefined }, enumerable: false, configurable: true, writable: true }, splice: { value: function (start, amount, ...items) { if (typeof this === "object" && "length" in this) { return Array.prototype.splice.call(this, start, amount, ...items) } return [] }, enumerable: false, configurable: true, writable: true }, unshift: { value: function () { if (typeof this === "object" && "length" in this) { return Array.prototype.unshift.apply(this, arguments) } return 0 }, enumerable: false, configurable: true, writable: true }, reverse: { value: function () { if (typeof this === "object" && "length" in this) { return Array.prototype.reverse.call(this) } return this }, enumerable: false, configurable: true, writable: true }, slice: { value: function () { if (typeof this === "object" && "length" in this) { return Array.prototype.slice.apply(this, arguments) } }, enumerable: false, configurable: true, writable: true }, sort: { value: function (cb) { if (typeof this === "object" && "length" in this) { return Array.prototype.sort.call(this, cb) } return this }, enumerable: false, configurable: true, writable: true } });
  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
    // -----


    makeSpritesGridInput("carrot", ([[1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]]));
    setPromptWithChoices('', 'my_1_o3l_7B__7DR_7DiNSYVARcd_', 'choice 1', 'choice 2', 'choice 3', function (val) { my_1_o3l_7B__7DR_7DiNSYVARcd_ = val; });
    playSound("assets/category_digital/ping.mp3");

    whenAllPromptsAnswered(function (extraArgs) {
      makeNewSpriteAnon("purple bunny", ({ "x": 200, "y": 200 }));
    });
    function moving_west(this_sprite) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "West");
    }

    function spinning_right(this_sprite) {
      turn(this_sprite, 6, "right");
    }

    function growing(this_sprite) {
      changePropBy(this_sprite, "scale", 1);
    }

    function swimming_left_and_right(this_sprite) {
      if (getProp(this_sprite, "direction") == 0) {
        mirrorSprite(this_sprite, "right");
      } else if (getProp(this_sprite, "direction") == 180) {
        mirrorSprite(this_sprite, "left");
      }
      moveForward(this_sprite, getProp(this_sprite, "speed"));
      if (isTouchingEdges(this_sprite)) {
        edgesDisplace(this_sprite);
        changePropBy(this_sprite, "direction", 180);
      }
    }

    function moving_east(this_sprite) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "East");
    }

    function moving_north(this_sprite) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "North");
    }

    function patrolling(this_sprite) {
      moveForward(this_sprite, getProp(this_sprite, "speed"));
      if (isTouchingEdges(this_sprite)) {
        edgesDisplace(this_sprite);
        changePropBy(this_sprite, "direction", 180);
      }
      if (getProp(this_sprite, "direction") > 270 || getProp(this_sprite, "direction") < 90) {
        mirrorSprite(this_sprite, "right");
      } else {
        mirrorSprite(this_sprite, "left");
      }
    }

    function moving_south(this_sprite) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "South");
    }

    function math_random_int(a, b) {
      if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
      }
      return Math.floor(Math.random() * (b - a + 1) + a);
    }

    function jittering(this_sprite) {
      changePropBy(this_sprite, "scale", math_random_int(-1, 1));
    }

    function wandering(this_sprite) {
      withPercentChance(20, function () {
        changePropBy(this_sprite, "direction", math_random_int(-25, 25));
      });
      moveForward(this_sprite, getProp(this_sprite, "speed"));
      if (isTouchingEdges(this_sprite)) {
        edgesDisplace(this_sprite);
        changePropBy(this_sprite, "direction", math_random_int(135, 225));
      }
      if (getProp(this_sprite, "direction") > 270 || getProp(this_sprite, "direction") < 90) {
        mirrorSprite(this_sprite, "right");
      } else {
        mirrorSprite(this_sprite, "left");
      }
    }

    function shrinking(this_sprite) {
      changePropBy(this_sprite, "scale", -1);
    }

    function spinning_left(this_sprite) {
      turn(this_sprite, 6, "left");
    }

    function moving_with_arrow_keys(this_sprite) {
      if (isKeyPressed("up")) {
        moveInDirection(this_sprite, getProp(this_sprite, "speed"), "North");
      }
      if (isKeyPressed("down")) {
        moveInDirection(this_sprite, getProp(this_sprite, "speed"), "South");
      }
      if (isKeyPressed("left")) {
        moveInDirection(this_sprite, getProp(this_sprite, "speed"), "West");
      }
      if (isKeyPressed("right")) {
        moveInDirection(this_sprite, getProp(this_sprite, "speed"), "East");
      }
    }

    function driving_with_arrow_keys(this_sprite) {
      if (isKeyPressed("up")) {
        moveForward(this_sprite, getProp(this_sprite, "speed"));
      }
      if (isKeyPressed("down")) {
        moveBackward(this_sprite, getProp(this_sprite, "speed"));
      }
      if (isKeyPressed("left")) {
        changePropBy(this_sprite, "direction", -5);
        changePropBy(this_sprite, "rotation", -5);
      }
      if (isKeyPressed("right")) {
        changePropBy(this_sprite, "direction", 5);
        changePropBy(this_sprite, "rotation", 5);
      }
      if (isTouchingEdges(this_sprite)) {
        edgesDisplace(this_sprite);
      }
    }

    function fluttering(this_sprite) {
      changePropBy(this_sprite, "y", math_random_int(-1, 1));
    }

    function wobbling(this_sprite) {
      withPercentChance(50, function () {
        setProp(this_sprite, "rotation", math_random_int(-1, 1));
      });
    }

    function moving_west_and_looping(this_sprite) {
      mirrorSprite(this_sprite, "left");
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "West");
      if (getProp(this_sprite, "x") < -50) {
        setProp(this_sprite, "x", 450);
      }
    }

    function moving_east_and_looping(this_sprite) {
      mirrorSprite(this_sprite, "right");
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "East");
      if (getProp(this_sprite, "x") > 450) {
        setProp(this_sprite, "x", -50);
      }
    }

    function moving_north_and_looping(this_sprite) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "North");
      if (getProp(this_sprite, "y") > 450) {
        setProp(this_sprite, "y", -50);
      }
    }

    function moving_south_and_looping(this_sprite) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "South");
      if (getProp(this_sprite, "y") < -50) {
        setProp(this_sprite, "y", 450);
      }
    }

    function func() {
    }
    try { window.draw = executeDrawLoopAndCallbacks; } catch (e) { }
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};
window.setup = function () {
  window.wrappedExportedCode('setup');
};      
