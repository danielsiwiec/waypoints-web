export const modal = {
    // display: 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
}

export const modalContent = {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%'
}

export const close = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    ':hover': {
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    ':focus': {
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer'
    }
}

export const header = {
  fontWeight: 'bold'
}
