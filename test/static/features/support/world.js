import { remote } from 'webdriverio';

function World() {
    this.driver = remote({
        desiredCapabilities: {
            browserName: 'chrome'
        }
    });
}

export default function() {
    this.World = World;
}
