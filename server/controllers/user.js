export const register = async (req, res) => {
  try {
    res.send("Register Api")
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}