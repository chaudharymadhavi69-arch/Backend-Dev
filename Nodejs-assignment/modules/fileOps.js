// event loop ka order dikhane ke liye

console.log("start");

setTimeout(() => {
    console.log("timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("promise");
});

process.nextTick(() => {
    console.log("next tick");
});

console.log("end");