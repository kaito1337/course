const passwordRegex = /^.*(?=.{6,})(?!.*\s)(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:]).*$/

export { passwordRegex}