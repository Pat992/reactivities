import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface ActivityDetailsProps {
    selectedActivity: IActivity,
    setEditMode: (editMode: boolean) => void,
    setSelectedActivity: (activity: IActivity | null) => void
}
const ActivityDetails: React.FC<ActivityDetailsProps> = ({ selectedActivity, setEditMode, setSelectedActivity }) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>{selectedActivity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color="blue" content="Edit" onClick={() => setEditMode(true)} />
                    <Button basic color="grey" content="Cancel" onClick={() => setSelectedActivity(null)} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails