// _11ty/config.js
import path from "path";

export const dirs = {
    input: "src",
    output: "dist",
    layouts: "layouts",
    partials: "partials",
    components: "components",
    assets: "assets",
    styles: "styles",
};

export const paths = {
    tailwind: "/" + path.join(dirs.styles, "index.css"),
};

export const aliases = {
    layouts: {
        base: `${dirs.layouts}/base.njk`,
        home: `${dirs.layouts}/home.njk`,
        about: `${dirs.layouts}/about.njk`,
        post: `${dirs.layouts}/post.njk`,
        feed: `${dirs.layouts}/feed.njk`,
        portfolio: `${dirs.layouts}/portfolio.njk`,
        project: `${dirs.layouts}/project.njk`,
        contact: `${dirs.layouts}/contact.njk`,
    },
    partials: {
        meta: `${dirs.partials}/meta.njk`,
        banner: `${dirs.partials}/banner.njk`,
        hero: `${dirs.partials}/hero.njk`,
        intro: `${dirs.partials}/intro.njk`,
        footer: `${dirs.partials}/footer.njk`,
        sidebar: `${dirs.partials}/sidebar.njk`,
        cta: `${dirs.partials}/cta.njk`,
        pagination: `${dirs.partials}/pagination.njk`,
        listing: `${dirs.partials}/listing.njk`,
        tech: `${dirs.partials}/tech.njk`,
    },
    components: {
        button: `${dirs.components}/button.njk`,
        logo: `${dirs.components}/logo.njk`,
        navbar: `${dirs.components}/navbar.njk`,
        socials: `${dirs.components}/socials.njk`,
        card: `${dirs.components}/card.njk`,
        item: `${dirs.components}/item.njk`,
        form: `${dirs.components}/form.njk`,
        tooltip: `${dirs.components}/tooltip.njk`,
    }
};
