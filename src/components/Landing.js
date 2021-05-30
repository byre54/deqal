import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { Image} from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles'
// import Web3 from 'web3'

const styles = {
  
}

// async function permisi() {
//     const web3 = await
// }

// if (typeof window.ethereum !== 'undefined') {
//     console.log('MetaMask is installed!');
// }
// if (window.ethereum) {
//     handleEthereum();
//   } else {
//     window.addEventListener('ethereum#initialized', handleEthereum, {
//       once: true,
//     });
  
//     // If the event is not dispatched by the end of the timeout,
//     // the user probably doesn't have MetaMask installed.
//     setTimeout(handleEthereum, 3000); // 3 seconds
//   }
  
//   function handleEthereum() {
//     const { ethereum } = window;
//     if (ethereum && ethereum.isMetaMask) {
//       console.log('Ethereum successfully detected!');
//       // Access the decentralized web!
//     } else {
//       console.log('Please install MetaMask!');
//     }
//   }
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
// const provider = new WalletConnectProvider({
//   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
// });

// //  Enable session (triggers QR Code modal)
// await provider.enable();
// //  Create Web3 instance
// // const web3 = new Web3(provider);

// const forwarderOrigin = 'http://localhost:9010';

// const initialize = () => {
//    //Basic Actions Section
//    const onboardButton = document.getElementById('konek');

//    //Created check function to see if the MetaMask extension is installed
//    const isMetaMaskInstalled = () => {
//      //Have to check the ethereum binding on the window object to see if it's installed
//      const { ethereum } = window;
//      return Boolean(ethereum && ethereum.isMetaMask);
//    };
 
//    //------Inserted Code------\\
//    const MetaMaskClientCheck = () => {
//      //Now we check to see if MetaMask is installed
//      if (!isMetaMaskInstalled()) {
//        //If it isn't installed we ask the user to click to install it
//        onboardButton.innerText = 'Click here to install MetaMask!';
//      } else {
//        //If it is installed we change our button text
//        onboardButton.innerText = 'Connect';
//      }
//    };
//    MetaMaskClientCheck();
// };
// window.addEventListener('DOMContentLoaded', initialize);
// import detectEthereumProvider from '@metamask/detect-provider'
// if (provider) {
//     startApp(provider)
// } else {
//     console.log('please install metamask')
// }
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