import { useState } from 'react';
import PropTypes from 'prop-types';

function LessonForm({ onSubmit }) {
    const [lessonData, setLessonData] = useState({
        title: '',
        description: '',
        content: '',
        difficulty: 'beginner',
        category: 'grammar'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(lessonData);
        setLessonData({
            title: '',
            description: '',
            content: '',
            difficulty: 'beginner',
            category: 'grammar'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLessonData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form className="lesson-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={lessonData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={lessonData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Content</label>
                <textarea
                    name="content"
                    value={lessonData.content}
                    onChange={handleChange}
                    required
                    rows="6"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Difficulty</label>
                    <select
                        name="difficulty"
                        value={lessonData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={lessonData.category}
                        onChange={handleChange}
                    >
                        <option value="grammar">Grammar</option>
                        <option value="vocabulary">Vocabulary</option>
                        <option value="pronunciation">Pronunciation</option>
                        <option value="culture">Culture</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="submit-btn">Add Lesson</button>
        </form>
    );
}

LessonForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default LessonForm; 