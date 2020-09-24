import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from '../../features/nav/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App: React.FC = () => {
  const [activities, setActivites] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [target, setTarget] = useState('')

  useEffect(() => {
    agent.Activities.list().then(res => {
      let activities: IActivity[] = []
      res.forEach((activity) => {
        activity.date = activity.date.split('.')[0]
        activities.push(activity)
      })
      setActivites(activities)
    }).then(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent content="Loading activities..." />

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true)
    agent.Activities.create(activity).then(() => {
      setActivites([...activities, activity])
      setSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true)
    agent.Activities.update(activity).then(() => {
      setActivites([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))
  }

  const handleDeleteActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true)
    setTarget(e.currentTarget.name)
    agent.Activities.delete(id).then(() => {
      setActivites([...activities.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false))
  }

  return (
    <React.Fragment>
      <Navbar openCreateFrom={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </React.Fragment>
  )
}

export default App;
