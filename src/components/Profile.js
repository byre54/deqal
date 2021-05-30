import React from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ImageIcon from '@material-ui/icons/Image'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import IPFS from 'ipfs'
// import IPFS from './web3/ipfs'
import ProfileGet from './ProfileGet'
import Gallery from './Galllery'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
//  couldn't make it work apearantly 


// async function tesipfs () {
//   const node = await IPFS.create()
//   const version = await node.version()
//   return version.version
// }
// async function ipfsls() {
//   for await (const file of IPFS.file.ls('bafybeihofntiighw777npky6dj6d6y7osgbxydw6l2bwkwz7tk2o5dkesu')) {
//     console.log(file.name)
//   }
// }

export default function Profile () {
  // console.log(tesipfs())
  const classes = useStyles()
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
        <AccountCircleIcon fontSize='large' /> ``
        {/* </Avatar> */}
        <Typography component='h1' variant='h4'>
          Mark Zulkerberg
        </Typography>``
        <List className={classes.root}>
          <ListItem>
            <Gallery />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='@zulk' secondary='Github' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='@markz' secondary='Twitter' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='https://www.mzulkerberg.me' secondary='Website' />
          </ListItem>
        </List>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='secondary'
          // onClick={ipfsls()}
          className={classes.submit}
        >
          TES
        </Button>
        {/* <h3>{this.state.tetet}</h3> */}
        <ProfileGet />
      </div>
    </Container>
  )
}
