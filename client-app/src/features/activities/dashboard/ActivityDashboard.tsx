import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'
import ActivityStore from '../../../app/stores/activityStore'

interface ActivityDashboardProps {
    activities: IActivity[],
    selectActivity: (id: string) => void,
    target: string,
    setEditMode: (editMode: boolean) => void,
    setSelectedActivity: (activity: IActivity | null) => void,
    createActivity: (activity: IActivity) => void,
    editActivity: (activity: IActivity) => void,
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void,
    submitting: boolean
}
const ActivityDashboard: React.FC<ActivityDashboardProps> = ({ activities, selectActivity, setEditMode, setSelectedActivity, createActivity, editActivity, deleteActivity, submitting, target }) => {
    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity } = activityStore;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList target={target} activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />}
                {editMode && <ActivityForm setEditMode={setEditMode} selectedActivity={selectedActivity!} createActivity={createActivity} editActivity={editActivity} key={selectedActivity && selectedActivity.id || 0} submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)