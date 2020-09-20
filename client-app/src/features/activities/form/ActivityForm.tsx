import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'
import { IActivity } from '../../../app/models/activity'

interface ActivityFormProps {
    selectedActivity: IActivity,
    setEditMode: (editMode: boolean) => void,
    createActivity: (activity: IActivity) => void,
    editActivity: (activity: IActivity) => void
}
const ActivityForm: React.FC<ActivityFormProps> = ({ setEditMode, selectedActivity, createActivity, editActivity }) => {
    const initForm = () => {
        if (selectedActivity) {
            return selectedActivity
        } else {
            return {
                id: "",
                title: "",
                category: "",
                description: "",
                date: "",
                city: "",
                venue: ""
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initForm)

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
        } else {
            editActivity(activity)
        }
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget
        setActivity({ ...activity, [name]: value })
        //setActivity({ ...activity, [e.target.name]: e.target.value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
                <Form.TextArea rows={2} placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
                <Form.Input type="datetime-local" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
                <Button floated="right" positive type="submit" content="Submit" name="title" />
                <Button floated="right" content="Cancel" onClick={() => setEditMode(false)} />
            </Form>
        </Segment>
    )
}

export default ActivityForm