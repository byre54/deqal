import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { Image} from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles'
// import Web3 from 'web3'

const styles = {
  
}
class Landing extends React.Component {
    render(){
        return (
            <Container component='main' maxWidth='xs'>
                <div style={{ textAlign:'center' }}>
                    <Image style={{display:'block',margin:'140px'}} src ='./images/deqalicon.png' />
                    <Button varian="outlined" color="primary" id="konek"  size="large">
                        Connect
                    </Button>
                </div>
            </Container>
        )
    }
}


export default withStyles(styles)(Landing)