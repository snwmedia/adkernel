import { RTB } from "../dist";

console.log('test running');
let d = new Date();
d.setDate(d.getDate() - 1);
await RTB.getAllZones(d, d);

// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);
