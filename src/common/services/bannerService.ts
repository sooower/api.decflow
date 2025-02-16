import fs from "node:fs";

import { configService } from "./configService";
import { loggerService } from "./loggerService";

function printBanner() {
    if (!fs.existsSync(configService.app?.bannerPath)) {
        return;
    }

    let bannerContent = fs.readFileSync(configService.app?.bannerPath, "utf-8");

    const appInfo = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    const appName = appInfo.name ?? "unknown";
    const appVersion = appInfo.version ?? "unknown";
    const appAuthor = appInfo.author ?? "unknown";

    //  Replace placeholders with actual values
    const values = bannerContent.match(/\$\{([^}]+)\}/g);
    for (const value of values ?? []) {
        switch (value.slice(2, value.length - 1)) {
            case "app.name": {
                bannerContent = bannerContent.replaceAll(/\$\{app.name\}/g, appName);
                break;
            }
            case "app.version": {
                bannerContent = bannerContent.replaceAll(/\$\{app.version\}/g, appVersion);
                break;
            }
            case "app.author": {
                bannerContent = bannerContent.replaceAll(/\$\{app.author\}/g, appAuthor);
                break;
            }
            default: {
                break;
            }
        }
    }

    for (const line of bannerContent.split("\n")) {
        loggerService.info(line);
    }
}

export const bannerService = {
    printBanner,
};
