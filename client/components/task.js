import React, {Component} from 'react'
import Box from '@material-ui/core/Box'

class Task extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    try {
      this.props.fetchTasks(this.props.match.params.songId)
    } catch (error) {
      console.log(error)
    }
  }

  // handleClick(songId) {
  // 	const currentMixtape = this.props.cart[0];
  // 	if (currentMixtape) {
  // 		this.props.addSongToCart(songId, currentMixtape.id);
  // 		toast.notify('Added to cart!', {
  // 			position: 'top-right'
  // 		});
  // 	} else {
  // 		this.props.createOrder();
  // 		this.props.addSongToCart(songId, currentMixtape.id);
  // 	}
  // }

  render() {
    const task = this.props.task
    return (
      <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
        primary.main
      </Box>
    )
  }
}

// const mapStateToProps = state => {
// 	return {
// 		song: state.single_song,
// 		cart: state.cartReducer
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		fetchSingleSong: id => dispatch(fetchSingleSong(id)),
// 		loadCart: () => dispatch(fetchCart()),
// 		addSongToCart: (songId, mixtapeId) => dispatch(addSongToCart(songId, mixtapeId)),
// 		createOrder: () => dispatch(createNewOrder())
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Single_Song);
export default Task
