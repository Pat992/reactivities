import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface navbarProps {
    openCreateFrom: () => void
}
const Navbar: React.FC<navbarProps> = ({ openCreateFrom }) => {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={openCreateFrom} />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default Navbar