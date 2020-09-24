import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface ActivityDashboardProps {
    activities: IActivity[],
    selectActivity: (id: string) => void,
    selectedActivity: IActivity,
    editMode: boolean,
    target: string,
    setEditMode: (editMode: boolean) => void,
    setSelectedActivity: (activity: IActivity | null) => void,
    createActivity: (activity: IActivity) => void,
    editActivity: (activity: IActivity) => void,
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void,
    submitting: boolean
}
const ActivityDashboard: React.FC<ActivityDashboardProps> = ({ activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity, createActivity, editActivity, deleteActivity, submitting, target }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList target={target} activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails selectedActivity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />}
                {editMode && <ActivityForm setEditMode={setEditMode} selectedActivity={selectedActivity!} createActivity={createActivity} editActivity={editActivity} key={selectedActivity && selectedActivity.id || 0} submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard