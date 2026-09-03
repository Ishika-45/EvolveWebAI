function validateMarketing(data) {
if (!data || typeof data !== "object" || Array.isArray(data)) {
throw new Error("Marketing must be a JSON object.");
}

if (!Array.isArray(data.features)) {
throw new Error("Marketing features must be an array.");
}

if (!Array.isArray(data.benefits)) {
throw new Error("Marketing benefits must be an array.");
}

if (!Array.isArray(data.seoKeywords)) {
throw new Error("Marketing SEO keywords must be an array.");
}

if (!Array.isArray(data.socialPosts)) {
throw new Error("Marketing socialPosts must be an array.");
}

if (!Array.isArray(data.adCopies)) {
throw new Error("Marketing adCopies must be an array.");
}

if (data.features.length > 4) {
throw new Error("Marketing cannot contain more than 4 features.");
}

if (data.benefits.length > 5) {
throw new Error("Marketing cannot contain more than 5 benefits.");
}

if (data.seoKeywords.length > 8) {
throw new Error("Marketing cannot contain more than 8 SEO keywords.");
}

if (data.socialPosts.length > 3) {
throw new Error("Marketing cannot contain more than 3 social posts.");
}

if (data.adCopies.length > 3) {
throw new Error("Marketing cannot contain more than 3 ad copies.");
}

return {
headline: data.headline ?? "",
subheadline: data.subheadline ?? "",
cta: data.cta ?? "",
features: data.features,
benefits: data.benefits,
seoKeywords: data.seoKeywords,
socialPosts: data.socialPosts,
emailCampaign: data.emailCampaign ?? {},
adCopies: data.adCopies,
};
}

module.exports = {
validateMarketing,
};
