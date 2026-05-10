import { CourseProgress } from "../models/CourseProgress.js"
import { SubSection } from "../models/SubSection.js"


const updatedCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body
    const userId = req.user.id

    try {
        const subSection = await SubSection.findById(subSectionId)
        if (!subSection) {
            return res.status(404).json({ error: "Invalid Subsetcion" })
        }

        const courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress does Not Exist"
            })
        } else {
            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({ error: "Subsection already completed" })
            }
            courseProgress.completedVideos.push(subSectionId)
        }

        await courseProgress.save()

        return res.status(200).json({ message: "Course Progress Updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export { updatedCourseProgress }