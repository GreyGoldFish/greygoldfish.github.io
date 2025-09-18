// _11ty/collections.js
export const collections = {
    featuredProjects: (collectionApi) => {
        return collectionApi.getFilteredByTag("project").filter(item => {
            return item.data.featured;
        });
    }
};
