"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGet = toGet;
function toGet(user) {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        position: user.position,
        level: user.level,
        country: user.country,
        is_email_confirmed: user.is_email_confirmed,
        profile_image: user.profile_image,
        is_editor: user.is_editor,
        created_at: user.created_at,
    };
}
//# sourceMappingURL=userMapping.js.map