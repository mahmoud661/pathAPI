"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleToSlug = titleToSlug;
function titleToSlug(title) {
    const timeStamp = new Date().getTime();
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    return `gen-${slug}-${timeStamp}`;
}
//# sourceMappingURL=roadmap.js.map