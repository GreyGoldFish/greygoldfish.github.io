const socialLinks = {
  github: {
    name: "GitHub",
    url: "https://github.com/greygoldfish",
    iconSrc: "/assets/icons/Git.svg"
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com/in/lucas-aquino-de-assis",
    iconSrc: "/assets/icons/LinkedIn.svg"
  },
};

// Add dynamic aria-labels
for (const key in socialLinks) {
    const social = socialLinks[key];
    social.ariaLabel = `My ${social.name} Profile`;
}

export default socialLinks;
