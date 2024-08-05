const nuwaLogoBase64 = "data:image/png;base64,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"
export default nuwaLogoBase64

