const firebaseConfig = {
  apiKey: "AIzaSyAKTof0tllNs6Jqniou9zaq8baJrJXBCoM",
  authDomain: "ashraf-27e6b.firebaseapp.com",
  projectId: "ashraf-27e6b",
  storageBucket: "ashraf-27e6b.appspot.com",
  messagingSenderId: "14595756122",
  appId: "1:14595756122:web:99e3ba2344567f9ff84863",
};
firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

let description = document.querySelector(".description");

let currentName;
let currentImage;
// Retrieve data from the URL
const urlParams = new URLSearchParams(window.location.search);
//Check for data in URL
if (urlParams.has("nameRoom") && urlParams.has("nameImage")) {
  currentName = decodeURIComponent(urlParams.get("nameRoom"));
  currentImage = decodeURIComponent(urlParams.get("nameImage"));

  //Display data on the page
  document.querySelector(".nameCurrentRoom").innerHTML += currentName;
  description.style.backgroundImage = currentImage;
} else {
  console.log("No user data found in URL");
}

let devices = document.querySelector(".devices");
let devicesPush = document.querySelector(".devicesPush");
let devicesPushDoor = document.querySelector(".devicesPushDoor");
let choosePush = document.querySelector(".choose-Push");
let containPushButtons = document.getElementById("containPushButtons");
let NameOfDevice = document.querySelector(".NameOfDevice");
let contentDevices = document.querySelector(".contentDevices");
let addDevice = document.querySelector(".addDevice");
let closecontentdevices = document.querySelector(".closecontentdevices");
let addNewDevice = document.querySelector(".addNewDevice");
let body = document.querySelector("body");
let modal = document.querySelector("modal");

let parentselectImage = document.querySelector(".parentselectImage");
let selectImg = document.getElementById("selectImg"); // input
let selectImage = document.querySelector(".selectImage"); // button
let closeImages = document.querySelector("#closeImages"); //close

// button open Form add New Device in this Room
addDevice.addEventListener("click", () => {
  contentDevices.style.transform = "scale(1)";
});

// button close Form
closecontentdevices.addEventListener("click", () => {
  contentDevices.style.transform = "scale(0)";
});

let DifferentDevice = document.getElementById("DifferentDevice");
let addDefferentDevice = document.querySelector(".addDefferentDevice");
let checkPushDoor = document.querySelector("#checkPushDoor");
let checkPush = document.querySelector("#checkPush");
let checkRemote = document.querySelector("#checkRemote");

addDefferentDevice.addEventListener("click", () => {
  // close form after adding new device
  contentDevices.style.transform = "scale(0)";

  // Call data from realtime
  let roomsRef = firebase.database().ref("Rooms");
  // if checkbox not Checked ====> : Normal device without bushing
  if (DifferentDevice.value != "") {
    if (!containPushButtons.checked) {
      roomsRef
        .orderByChild("Name")
        .equalTo(currentName)
        .once("value")
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const devicesArray = childSnapshot.val().devices || [];
            const newDevice = {
              Name: DifferentDevice.value,
              status: 0,
              nameImage: selectImg.value,
            };
            const deviceExists = devicesArray.some(
              (device) => device.Name === newDevice.Name
            );
            if (deviceExists) {
              alert("This device already exists");
            } else {
              devicesArray.push(newDevice);
              childSnapshot.ref.update({ devices: devicesArray }).then(() => {
                console.log("تم إضافة الجهاز بنجاح!");
                DifferentDevice.value = "";
                selectImg.value = "";
              });
            }
          });
        })
        .catch((error) => {
          console.error("حدث خطأ أثناء إضافة الجهاز الجديد:", error);
        });
    } else {
      if (checkPush.checked) {
        roomsRef
          .orderByChild("Name")
          .equalTo(currentName)
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const devicesArray = childSnapshot.val().devicesPush || [];
              const newDevice = {
                Name: "Push" + DifferentDevice.value,
                status: 0,
              };
              const deviceExists = devicesArray.some(
                (device) => device.Name === newDevice.Name
              );
              if (deviceExists) {
                alert("This device already exists");
              } else {
                devicesArray.push(newDevice);
                childSnapshot.ref
                  .update({ devicesPush: devicesArray })
                  .then(() => {
                    console.log("تم إضافة الجهاز بنجاح!");
                    DifferentDevice.value = "";
                  });
              }
            });
          })
          .catch((error) => {
            console.error("حدث خطأ أثناء إضافة الجهاز الجديد:", error);
          });
      }
      if (checkPushDoor.checked) {
        roomsRef
          .orderByChild("Name")
          .equalTo(currentName)
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const devicesArray = childSnapshot.val().devicesPushDoor || [];
              const newDevice = {
                Name: "Push" + DifferentDevice.value,
                status: 0,
              };
              const deviceExists = devicesArray.some(
                (device) => device.Name === newDevice.Name
              );
              if (deviceExists) {
                alert("This device already exists");
              } else {
                devicesArray.push(newDevice);
                childSnapshot.ref
                  .update({ devicesPushDoor: devicesArray })
                  .then(() => {
                    console.log("تم إضافة الجهاز بنجاح!");
                    DifferentDevice.value = "";
                  });
              }
            });
          })
          .catch((error) => {
            console.error("حدث خطأ أثناء إضافة الجهاز الجديد:", error);
          });
      }
      if (checkRemote.checked) {
        roomsRef
          .orderByChild("Name")
          .equalTo(currentName)
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const devicesArray = childSnapshot.val().devicesPushRemote || [];
              const newDevice = {
                Name: "Push" + DifferentDevice.value,
                status_on_off: 0,
                status_mute: 0,
                status_up: 0,
                status_down: 0,
                status_right: 0,
                status_left: 0,
                status_play: 0,
                status_low: 0,
                status_high: 0,
                status_rotate: 0,
                status_arrow: 0,
              };
              const deviceExists = devicesArray.some(
                (device) => device.Name === newDevice.Name
              );
              if (deviceExists) {
                alert("This device already exists");
              } else {
                devicesArray.push(newDevice);
                childSnapshot.ref
                  .update({ devicesPushRemote: devicesArray })
                  .then(() => {
                    console.log("تم إضافة الجهاز بنجاح!");
                    DifferentDevice.value = "";
                  });
              }
            });
          })
          .catch((error) => {
            console.error("حدث خطأ أثناء إضافة الجهاز الجديد:", error);
          });
      }
    }
  } else {
    alert("Enter Name of Device");
  }
});

containPushButtons.addEventListener("change", () => {
  if (containPushButtons.checked) {
    parentselectImage.style.opacity = "0";
    choosePush.style.display = "block";
  } else {
    parentselectImage.style.opacity = "1";
    choosePush.style.display = "none";
  }
});

// function DisplayDevices() {
//   const roomsRef = firebase.database().ref("Rooms");
//   roomsRef
//     .orderByChild("Name")
//     .equalTo(currentName)
//     .on(
//       "value",
//       (snapshot) => {
//         devices.innerHTML = "";
//         snapshot.forEach((childSnapshot) => {
//           devices.innerHTML = "";

//           const devicesArray = childSnapshot.val().devices || [];
//           devicesArray.forEach((device, i) => {
//             let buttonStyle =
//               device.status == "1" ? "btn-success" : "btn-danger";
//             let buttonText = device.status == "1" ? "OFF" : "ON";

//             let card = `<div class="card border-0 p-2 cardBtn">
//             <span style="opacity:0">${i}</span>
//             <p class="nameOfDevice">${device.Name}</p>
//             <img src="../imagesDevices/${device.nameImage}.jpg" alt="">
//             <i class="fa-solid fa-trash-can deletbtnDevice"></i>
//             <div class="container">
//               <button class="toggle btn ${buttonStyle}" data-room-key="${childSnapshot.key}" data-device-index="${i}">${buttonText}</button>
//               <span style="opacity:0">${device.Name}</span>
//             </div>

//             <span style="opacity:0">${childSnapshot.key}</span>
//           </div>`;
//             devices.innerHTML += card;
//           });
//         });

//         // Attach click event listeners to the toggle buttons
//         let toggleButtons = devices.querySelectorAll(".toggle");
//         toggleButtons.forEach((button) => {
//           button.addEventListener("click", () => {
//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;
//             const newStatus = button.textContent === "ON" ? "1" : "0";

//             // Get the devices array for the current room
//             const devicesArray = snapshot.child(roomKey).val().devices || [];

//             // Check if the deviceIndex is within the valid range
//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               // Get the name of the device
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;

//               const newImage = imageName;
//               const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
//               const nameOfArray = "devices"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 newStatus,
//                 newName,
//                 nameOfArray,
//                 newImage
//               );
//             }
//           });
//         });
//       },
//       (error) => {
//         console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
//       }
//     );

// }

function DisplayDevices() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        devices.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          devices.innerHTML = "";

          const devicesArray = childSnapshot.val().devices || [];
          devicesArray.forEach((device, i) => {
            let iconColor = device.status == "1" ? "#32e072" : "red";

            let card = `<div class="card border-0 p-2 cardBtn">
            <span style="opacity:0">${i}</span>
            <p class="nameOfDevice">${device.Name}</p>
            <img src="../imagesDevices/${device.nameImage}.jpg" alt="">
            <i class="fa-solid fa-trash-can deletbtnDevice"></i>
            <div class="container">
              <i class="fa-solid fa-power-off" style="color: ${iconColor}" data-room-key="${childSnapshot.key}" data-device-index="${i}"></i>
              <span style="opacity:0">${device.Name}</span>
            </div>
      
            <span style="opacity:0">${childSnapshot.key}</span>
          </div>`;
            devices.innerHTML += card;
          });
        });

        // Attach click event listeners to the power icons
        let powerIcons = devices.querySelectorAll(".fa-power-off");
        powerIcons.forEach((icon) => {
          icon.addEventListener("click", () => {
            const roomKey = icon.dataset.roomKey;
            const deviceIndex = icon.dataset.deviceIndex;
            const newStatus = icon.style.color == "red" ? "1" : "0";

            // Get the devices array for the current room
            const devicesArray = snapshot.child(roomKey).val().devices || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;

              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devices";

              updateStateDevice(
                roomKey,
                deviceIndex,
                newStatus,
                newName,
                nameOfArray,
                newImage
              );
            }
          });
        });
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}

// function DisplayPushDevicesDoor() {
//   const roomsRef = firebase.database().ref("Rooms");
//   roomsRef
//     .orderByChild("Name")
//     .equalTo(currentName)
//     .on(
//       "value",
//       (snapshot) => {
//         devicesPushDoor.innerHTML = "";
//         snapshot.forEach((childSnapshot) => {
//           const devicesArray = childSnapshot.val().devicesPushDoor || [];
//           let html = "";
//           devicesArray.forEach((device, i) => {
//               let buttonStylePush = device.status == 1 || device.status == 2
//                   ? "btn-success"
//                   : "btn-danger";

//               let overlayBottom = device.status == 1 || device.status == 0
//                   ? "100%"
//                   : "28%";

//               let boldContent = device.status == 1 || device.status == 0
//                   ? "مفتوح"
//                   : "مغلق";

//               let card = `<div class="card border-0 p-2">
//                   <span style="opacity:0">${i}</span>
//                   <span class="overlay" style="bottom:${overlayBottom}; transition:.7s"></span>
//                   <p class="nameOfDevice">${device.Name}</p>
//                   <i class="fa-solid fa-trash-can deletbtnDevice pushbtn"></i>
//                   <bold class="bold">${boldContent}</bold>
//                   <div class="container">
//                       ${device.status != 1
//                           ? `<button class="pushOFF btn ${buttonStylePush}" data-room-key="${childSnapshot.key}" data-device-index="${i}">OFF</button>`
//                           : ""}
//                       ${device.status != 2
//                           ? `<button class="pushON btn ${buttonStylePush}" data-room-key="${childSnapshot.key}" data-device-index="${i}">ON</button>`
//                           : ""}
//                   </div>
//                   <span style="opacity:0">${childSnapshot.key}</span>
//               </div>`;
//               html += card;
//           });

//           devicesPushDoor.innerHTML = html;
//       });

//         // Attach click event listeners to the toggle buttons
//         let PushButtonON = devicesPushDoor.querySelectorAll(".pushON");

//         PushButtonON.forEach((button) => {
//           button.addEventListener("mousedown", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//                updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "1",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );
//               button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom ="100%"

//             }
//           });

//           button.addEventListener("touchstart", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "1",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );

//               button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom="100%"
//             }
//           });

//           button.addEventListener("mouseup", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "0",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );

//             }
//           });

//           button.addEventListener("touchend", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "0",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );

//             }
//           });
//         });

//         let PushButtonOFF = devicesPushDoor.querySelectorAll(".pushOFF");

//         PushButtonOFF.forEach((button) => {
//           button.addEventListener("mousedown", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "2",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );
//               button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom="27%"
//             }
//           });

//           button.addEventListener("touchstart", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "2",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );
//               button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom ="27%"
//             }
//           });

//           button.addEventListener("mouseup", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "3",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );
//             }
//           });

//           button.addEventListener("touchend", () => {

//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPushDoor || [];

//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName;
//               const nameOfArray = "devicesPushDoor";

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "3",
//                 newName,
//                 nameOfArray,
//                 newImage
//               );
//             }
//           });
//         });

//       },
//       (error) => {
//         console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
//       }
//     );
// }

// function DisplayPushDevices() {
//   const roomsRef = firebase.database().ref("Rooms");
//   roomsRef
//     .orderByChild("Name")
//     .equalTo(currentName)
//     .on(
//       "value",
//       (snapshot) => {
//         devicesPush.innerHTML = "";
//         snapshot.forEach((childSnapshot) => {
//           devicesPush.innerHTML = "";
//           const devicesArray = childSnapshot.val().devicesPush || [];
//           devicesArray.forEach((device, i) => {
//             let buttonStylePush =
//               device.status == "1" ? "btn-success" : "btn-danger";

//             let card = `<div class="card border-0 p-2">
//             <span style="opacity:0">${i}</span>
//             <img src="../images/${device.nameImage}.jpg" alt="">
//             <p class="nameOfDevice">${device.Name}</p>
//             <i class="fa-solid fa-trash-can deletbtnDevice pushbtn"></i>
//             <div class="container">
//               <button class="push btn ${buttonStylePush}" data-room-key="${childSnapshot.key}" data-device-index="${i}">Push</button>
//             </div>

//             <span style="opacity:0">${childSnapshot.key}</span>
//           </div>`;
//             devicesPush.innerHTML += card;
//           });
//         });

//         // Attach click event listeners to the toggle buttons
//         let PushButtons = devicesPush.querySelectorAll(".push");
//         PushButtons.forEach((button) => {
//           button.addEventListener("mousedown", () => {
//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             // Get the devices array for the current room
//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPush || [];

//             // Check if the deviceIndex is within the valid range
//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               // Get the name of the device
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;

//               const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
//               const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "1",
//                 newName,
//                 nameOfArray,

//                 newImage
//               );
//             }
//           });

//           button.addEventListener("touchstart", () => {
//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             // Get the devices array for the current room
//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPush || [];

//             // Check if the deviceIndex is within the valid range
//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               // Get the name of the device
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
//               const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "1",
//                 newName,
//                 nameOfArray,

//                 newImage
//               );
//             }
//           });
//         });

//         PushButtons.forEach((button) => {
//           button.addEventListener("mouseup", () => {
//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             // Get the devices array for the current room
//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPush || [];

//             // Check if the deviceIndex is within the valid range
//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               // Get the name of the device
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
//               const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "0",
//                 newName,
//                 nameOfArray,

//                 newImage
//               );
//             }
//           });

//           button.addEventListener("touchend", () => {
//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;

//             // Get the devices array for the current room
//             const devicesArray =
//               snapshot.child(roomKey).val().devicesPush || [];

//             // Check if the deviceIndex is within the valid range
//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               // Get the name of the device
//               const deviceName = devicesArray[deviceIndex].Name;
//               const imageName = devicesArray[deviceIndex].nameImage;
//               const newImage = imageName;
//               const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
//               const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

//               updateStateDevice(
//                 roomKey,
//                 deviceIndex,
//                 "0",
//                 newName,
//                 nameOfArray,

//                 newImage
//               );
//             }
//           });
//         });

//         // استبدل حدث mouseup بـ touchend
//       },
//       (error) => {
//         console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
//       }
//     );
// }

function DisplayPushDevicesDoor() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        devicesPushDoor.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          const devicesArray = childSnapshot.val().devicesPushDoor || [];
          let html = "";
          devicesArray.forEach((device, i) => {
            // let iconColorON = device.status == 1 ? "#32e072" : "red";
            // let iconColorOFF = device.status == 2 ? "#32e072" : "red";

            let overlayBottom =
              device.status == 1 || device.status == 0 ? "100%" : "28%";

            let boldContent =
              device.status == 1 || device.status == 0 ? "مفتوح" : "مغلق";

            let card = `<div class="card border-0 p-2">
                <span style="opacity:0">${i}</span>
                <span class="overlay" style="bottom:${overlayBottom}; transition:.7s"></span>
                <p class="nameOfDevice">${device.Name}</p>
                <i class="fa-solid fa-trash-can deletbtnDevice pushbtn"></i>
                <bold class="bold">${boldContent}</bold>
                <div class="container">
                    ${
                      device.status != 1
                        ? `<i class="fa-solid fa-power-off pushOFF" style="color: red" data-room-key="${childSnapshot.key}" data-device-index="${i}"></i>`
                        : ""
                    }
                    ${
                      device.status != 2
                        ? `<i class="fa-solid fa-power-off pushON" style="color: #32e072" data-room-key="${childSnapshot.key}" data-device-index="${i}"></i>`
                        : ""
                    }
                </div>
                <span style="opacity:0">${childSnapshot.key}</span>
            </div>`;
            html += card;
          });

          devicesPushDoor.innerHTML = html;
        });

        // Attach click event listeners to the power-off icons
        let PushButtonON = devicesPushDoor.querySelectorAll(".pushON");

        PushButtonON.forEach((button) => {
          button.addEventListener("mousedown", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "1",
                newName,
                nameOfArray,
                newImage
              );
              button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom =
                "100%";
            }
          });

          button.addEventListener("touchstart", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "1",
                newName,
                nameOfArray,
                newImage
              );

              button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom =
                "100%";
            }
          });

          button.addEventListener("mouseup", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "0",
                newName,
                nameOfArray,
                newImage
              );
            }
          });

          button.addEventListener("touchend", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "0",
                newName,
                nameOfArray,
                newImage
              );
            }
          });
        });

        let PushButtonOFF = devicesPushDoor.querySelectorAll(".pushOFF");

        PushButtonOFF.forEach((button) => {
          button.addEventListener("mousedown", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "2",
                newName,
                nameOfArray,
                newImage
              );
              button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom =
                "27%";
            }
          });

          button.addEventListener("touchstart", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "2",
                newName,
                nameOfArray,
                newImage
              );
              button.parentElement.parentElement.firstElementChild.nextElementSibling.style.bottom =
                "27%";
            }
          });

          button.addEventListener("mouseup", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "3",
                newName,
                nameOfArray,
                newImage
              );
            }
          });

          button.addEventListener("touchend", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            const devicesArray =
              snapshot.child(roomKey).val().devicesPushDoor || [];

            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPushDoor";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "3",
                newName,
                nameOfArray,
                newImage
              );
            }
          });
        });
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}

function DisplayPushDevices() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        devicesPush.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          devicesPush.innerHTML = "";
          const devicesArray = childSnapshot.val().devicesPush || [];
          devicesArray.forEach((device, i) => {
            let iconColorPush = device.status == "1" ? "#32e072" : "red";

            let card = `<div class="card border-0 p-2">
            <span style="opacity:0">${i}</span>
            <img src="../images/${device.nameImage}.jpg" alt="">
            <p class="nameOfDevice">${device.Name}</p>
            <i class="fa-solid fa-trash-can deletbtnDevice pushbtn"></i>
            <div class="container">
              <i class="fa-solid fa-power-off" style="color: ${iconColorPush}" data-room-key="${childSnapshot.key}" data-device-index="${i}"></i>
            </div>

            <span style="opacity:0">${childSnapshot.key}</span>
          </div>`;
            devicesPush.innerHTML += card;
          });
        });

        // Attach click event listeners to the power-off icons
        let powerOffIcons = devicesPush.querySelectorAll(".fa-power-off");
        powerOffIcons.forEach((icon) => {
          icon.addEventListener("mousedown", () => {
            const roomKey = icon.dataset.roomKey;
            const deviceIndex = icon.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPush";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "1",
                newName,
                nameOfArray,
                newImage
              );
            }
          });

          icon.addEventListener("touchstart", () => {
            const roomKey = icon.dataset.roomKey;
            const deviceIndex = icon.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPush";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "1",
                newName,
                nameOfArray,
                newImage
              );
            }
          });

          icon.addEventListener("mouseup", () => {
            const roomKey = icon.dataset.roomKey;
            const deviceIndex = icon.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPush";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "0",
                newName,
                nameOfArray,
                newImage
              );
            }
          });

          icon.addEventListener("touchend", () => {
            const roomKey = icon.dataset.roomKey;
            const deviceIndex = icon.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName;
              const newName = deviceName;
              const nameOfArray = "devicesPush";

              updateStateDevice(
                roomKey,
                deviceIndex,
                "0",
                newName,
                nameOfArray,
                newImage
              );
            }
          });
        });
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}

let devicesPushRemote = document.querySelector(".devicesPushRemote");
// <i class="fa-solid fa-volume-high"></i>
// <i class="fa-solid fa-volume-low"></i>
// <i class="fa-solid fa-circle-play"></i>
// <i class="fa-solid fa-repeat"></i>
// <i class="fa-solid fa-rotate-left"></i>
// <i class="fa-solid fa-right-left"></i>

// status_play: 0,
// status_low: 0,
// status_high: 0,
// status_rotate: 0,
// status_arrow: 0,
function DisplayDevicesPushRemote() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        devicesPushRemote.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          devicesPushRemote.innerHTML = "";
          const devicesArray = childSnapshot.val().devicesPushRemote || [];
          devicesArray.forEach((device, i) => {
            let powerIcon = `<i class="fa-solid fa-power-off" style="color: ${
              device.status_on_off == "1" ? "#32e072" : "red"
            }"></i>`;

            let volumeIcon = `<i class="fa-solid fa-volume-xmark" style="color: ${
              device.status_mute == "1" ? "#32e072" : "red"
            }"></i>`;
            let upIcon = `<i class="fa-solid fa-caret-up" style="color:${
              device.status_up == "1" ? "#32e072" : "red"
            }"></i>`;
            let downIcon = `<i class="fa-solid fa-caret-down" style="color: ${
              device.status_down == "1" ? "#32e072" : "red"
            }"></i>`;
            let PlayIcon = `<i class="fa-solid fa-circle-play" style="color: ${
              device.status_play == "1" ? "#32e072" : "red"
            }"></i>`;

            let LowIcon = `<i class="fa-solid fa-volume-low" style="color: ${
              device.status_low == "1" ? "#32e072" : "red"
            }"></i>`;
            let HighIcon = `<i class="fa-solid fa-volume-high" style="color: ${
              device.status_high == "1" ? "#32e072" : "red"
            }"></i>`;
            let RotateIcon = `<i class="fa-solid fa-rotate-left" style="color: ${
              device.status_rotate == "1" ? "#32e072" : "red"
            }"></i>`;
            let ArrowIcon = `<i class="fa-solid fa-right-left" style="color: ${
              device.status_arrow == "1" ? "#32e072" : "red"
            }"></i>`;

            let leftIcon = `<i class="fa-solid fa-caret-left" style="color: ${
              device.status_left == "1" ? "#32e072" : "red"
            }"></i>`;

            let rightIcon = `<i class="fa-solid fa-caret-right" style="color: ${
              device.status_right == "1" ? "#32e072" : "red"
            }"></i>`;

            let card = `<div class="card border-0 p-2">
            <i class="fa-solid fa-trash-can deletbtnDevice"></i>
            ${powerIcon}
            <div class="container">
              <img src="../imagesDevices/images.jpg" alt="">
              ${upIcon}
              ${downIcon}
              ${rightIcon}
              ${leftIcon}
              ${PlayIcon}
          
            </div>
            ${RotateIcon}
            ${ArrowIcon}
            ${LowIcon}
            ${HighIcon}
            ${volumeIcon}
          </div>`;

            devicesPushRemote.innerHTML += card;

            // Attach click event listeners for icons
            let icons = devicesPushRemote.querySelectorAll(
              `.fa-power-off, .fa-volume-xmark, .fa-caret-up, .fa-caret-down, .fa-caret-right, .fa-caret-left ,.fa-circle-play,.fa-rotate-left,.fa-right-left,.fa-volume-high,.fa-volume-low`
            );

            icons.forEach((icon, index) => {
              if (
                icon.classList.contains("fa-caret-up") ||
                icon.classList.contains("fa-caret-down") ||
                icon.classList.contains("fa-caret-right") ||
                icon.classList.contains("fa-circle-play") ||
                icon.classList.contains("fa-rotate-left") ||
                icon.classList.contains("fa-right-left") ||
                icon.classList.contains("fa-volume-high") ||
                icon.classList.contains("fa-volume-low") ||
                icon.classList.contains("fa-caret-left")
              ) {
                icon.addEventListener("mousedown", () => {
                  const statusType = getStatusType(index);
                  const newStatus = "1";
                  updateDeviceStatus(
                    childSnapshot.key,
                    i,
                    statusType,
                    newStatus
                  );
                });

                icon.addEventListener("mouseup", () => {
                  const statusType = getStatusType(index);
                  const newStatus = "0";
                  updateDeviceStatus(
                    childSnapshot.key,
                    i,
                    statusType,
                    newStatus
                  );
                });
              } else {
                icon.addEventListener("click", () => {
                  const statusType = getStatusType(index);
                  const newStatus = device[statusType] == "1" ? "0" : "1";
                  updateDeviceStatus(
                    childSnapshot.key,
                    i,
                    statusType,
                    newStatus
                  );
                });
              }
            });
          });
        });
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}

function getStatusType(index) {
  switch (index) {
    case 0:
      return "status_on_off";
    case 1:
      return "status_up";
    case 2:
      return "status_down";
    case 3:
      return "status_right";
    case 4:
      return "status_left";
    case 5:
      return "status_play";
    case 6:
      return "status_rotate";
    case 7:
      return "status_arrow";
    case 8:
      return "status_low";
    case 9:
      return "status_high";
    case 10:
      return "status_mute";

    default:
      return "";
  }
}

function updateDeviceStatus(roomKey, deviceIndex, statusType, newStatus) {
  // Update status in Firebase
  const updates = {};
  updates[`Rooms/${roomKey}/devicesPushRemote/${deviceIndex}/${statusType}`] =
    newStatus;
  firebase.database().ref().update(updates);
}

function updateStateDevice(
  uid,
  index,
  currentStatus,
  NewName,
  NameOfArray,
  newImage
) {
  var data = {
    status: currentStatus,
    Name: NewName,
    nameImage: newImage,
  };

  $.ajax({
    url: `https://ashraf-27e6b-default-rtdb.firebaseio.com/Rooms/${uid}/${NameOfArray}/${index}.json`,
    method: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: function () {
      // Hide the clicked button
      const button = devices.querySelector(
        `[data-room-key="${uid}"][data-device-index="${index}"]`
      );
      // button.classList.add("hidden");
    },
    error: function () {
      console.error("حدث خطأ أثناء تحديث حالة الجهاز.");
    },
  });
}
// devicesPushRemote
window.onload = () => {
  DisplayDevices();
  DisplayPushDevices();
  DisplayPushDevicesDoor();
  DisplayDevicesPushRemote();
};

let currentStatus = 1;

fetch("https://worldtimeapi.org/api/ip")
  .then((response) => response.json())
  .then((data) => {
    const currentTime = new Date(data.datetime);
    console.log(currentTime);

    setInterval(() => {
      const currentTime = new Date();

      // التحقق من الساعة والدقائق لتحديث القيمة فقط في الساعة 6 صباحًا ومساءًا
      if (
        (currentTime.getHours() === 6 && currentTime.getMinutes() === 0) ||
        (currentTime.getHours() === 18 && currentTime.getMinutes() === 0)
      ) {
        updateStatus();
      }
    }, 1000);
  })
  .catch((error) => console.log(error));

function updateStatus() {
  const currentTime = new Date();

  if (currentTime.getHours() >= 6 && currentTime.getHours() < 18) {
    currentStatus = 0;
  } else {
    currentStatus = 1;
  }

  const roomsRef = firebase.database().ref("Rooms");
  const frontRoomRef = roomsRef.child("2");

  frontRoomRef.once("value", (snapshot) => {
    const devicesArray = snapshot.val().devices || [];

    devicesArray.forEach((device, i) => {
      setTimeout(() => {
        const deviceRef = frontRoomRef.child("devices").child(i.toString());
        deviceRef.update({ status: currentStatus });
      }, i * 1000);
    });
  });
}

// initialization of two variables to store index and name of device
let index;
let newNameOfDevice;

// container all Devices
devices.addEventListener("click", (e) => {
  // index and uid :==> (id) and name of current Device to use later during updating
  let uid = e.target.parentElement.parentElement.lastElementChild.innerHTML;

  // uid and index for this current element
  uid = e.target.parentElement.lastElementChild.innerHTML;
  index = e.target.parentElement.firstElementChild.innerHTML;
  // the Element that contains classes : ( fa-solid fa-xmark deletbtnDevice notPushDevice ) will be deleted
  if (e.target.classList == "fa-solid fa-trash-can deletbtnDevice") {
    if (confirm("Confirm Delete")) {
      deleteDevice(uid, index, "devices");
    } else {
      alert("Delete Cancel");
    }
  }
  if (e.target.classList == "fa-solid fa-trash-can deletbtnDevice pushbtn") {
    if (confirm("Confirm Delete")) {
      deleteDevice(uid, index, "devicesPush");
    } else {
      alert("Delete Cancel");
    }
  }
});

devicesPush.addEventListener("click", (e) => {
  // index and uid :==> (id) and name of current Device to use later during updating
  let uid = e.target.parentElement.parentElement.lastElementChild.innerHTML;

  // uid and index for this current element
  uid = e.target.parentElement.lastElementChild.innerHTML;
  index = e.target.parentElement.firstElementChild.innerHTML;
  // the Element that contains classes : ( fa-solid fa-xmark deletbtnDevice notPushDevice ) will be deleted
  if (e.target.classList == "fa-solid fa-trash-can deletbtnDevice") {
    if (confirm("Confirm Delete")) {
      deleteDevice(uid, index, "devices");
    } else {
      alert("Delete Cancel");
    }
  }
  if (e.target.classList == "fa-solid fa-trash-can deletbtnDevice pushbtn") {
    if (confirm("Confirm Delete")) {
      deleteDevice(uid, index, "devicesPush");
    } else {
      alert("Delete Cancel");
    }
  }
});

// function delete device using index and uid
function deleteDevice(uid, index, NameOfArray) {
  $.ajax({
    url: `https://ashraf-27e6b-default-rtdb.firebaseio.com/Rooms/${uid}/${NameOfArray}/${index}.json`,
    method: "DELETE",
    success: function () {
      alert("Device deleted successfully");
    },
    error: function () {
      alert("Failed to delete Device");
    },
  });
}

// button select image
selectImage.addEventListener("click", function (e) {
  e.preventDefault();
  containerImage.style.transform = " scale(1)";
});

// close list of Images
closeImages.addEventListener("click", function (e) {
  e.preventDefault();
  containerImage.style.transform = " scale(0)";
});

let containerSelectionImages = document.querySelector(
  ".containerSelectionImages"
);

// for loop ( 12 image ) : 12 is not fixed, it changes according to the number of images
for (let i = 1; i <= 22; i++) {
  let newImage = `
<div class="cardImage">
<img src="../imagesDevices/${i}.jpg" alt="">
<span>${i}</span>
</div>
`;
  containerSelectionImages.innerHTML += newImage;
}

const images = document.querySelectorAll(".cardImage img");

// in click any image will take name for this image and close List of Images
images.forEach(function (image) {
  image.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "img") {
      const card = event.target.closest(".cardImage");
      const span = card.querySelector("span");
      selectImg.value = span.textContent;
      containerImage.style.transform = " scale(0)";
    }
  });
});
