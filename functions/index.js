export const imageSource = (user) => {
	// console.log(user);
	if (user.images) {
		return user.images.url;
	} else {
		return "/images/default.webp";
	}
};
