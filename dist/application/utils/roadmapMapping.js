"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGet = toGet;
function toGet(roadmap) {
    return {
        id: roadmap.id,
        title: roadmap.title,
        slug: roadmap.slug,
        description: roadmap.description,
        is_official: roadmap.is_official,
        icon: roadmap.icon,
    };
}
//# sourceMappingURL=roadmapMapping.js.map