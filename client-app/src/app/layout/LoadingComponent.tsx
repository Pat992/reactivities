import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface LoadingComponentProps {
    inverted?: boolean,
    content?: string
}
const LoadingComponent: React.FC<LoadingComponentProps> = ({ inverted = true, content }) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

export default LoadingComponent
