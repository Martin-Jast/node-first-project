import React from 'react';
import './index.css';

//Product class that holds the information of the product inside it's state.
class Product extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      image_url: props.product.image_url,
      productName: props.product.productName,
      price: props.product.price,
      productID: props.product.id,
    }
  }

// onClick={() => { history.push('/products/'+this.state.id) }}>
  render() {
      return (
        <button className="product">
          <img className="productImage" src= {this.state.image_url} alt= "Product"/>
          <div className="productName" >{this.state.productName}</div>
          <div className="price" >{'R$: '+ this.state.price}</div>
          {this.props.value}
      </button>
    );
  }
}

//Display is responsible to generate and hold all the products that are displayed
class Display extends React.Component {

  renderSquare( sProduct, i) {
    return(
     <Product
    product= {sProduct}
    key={i}
    onClick={() => this.handleClick(i)}
     />);
  }

  renderSquares(){
    var holder = [];
    for( var i = 0; i < this.props.products.length; i++){
      holder.push(this.renderSquare( this.props.products[i], i));
    }
    return holder;
  }

  render() {
    return (
          <div className="display-row">{this.renderSquares()}</div>
    );
  }
}

class ProductCreator extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      productName: '',
      price: '',
      image_url: '',
      productDescription: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event){
    this.setState({
      productName: event.target.value
    });
  }

  handleChangePrice(event){
    this.setState({
      price: event.target.value
    });
  }

  handleChangeURL(event){
    this.setState({
      image_url: event.target.value
    });
  }

  handleChangeDesc(event){
    this.setState({
      productDescription: event.target.value
    });
  }

//======https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url/22648406#22648406
  isURL(str) {
     var urlRegex = /^(http[s]?:\/\/(www.)?|ftp:\/\/(www.)?|www.){1}([0-9A-Za-z-.@:%_+~#=]+)+((.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/g;
     var url = new RegExp(urlRegex, 'i');
     return str.length < 2083 && url.test(str);
}

  checkValidProduct(){
    return this.isURL(this.state.image_url) && this.state.productName !== '' && this.state.price !== '';
  }

  handleSubmit(event){
    if(this.checkValidProduct()){
      fetch('/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      });
      alert( 'A product was Submited: ' + this.state.productName );
    }else{
      alert('Invalid product');
      event.preventDefault();
    }
  }


  render(){
    return(
      <form onSubmit={ this.handleSubmit }>
        <label>
          Name:
          <input type="text" value={ this.state.productName } onChange={ this.handleChangeName } />
        </label>
        <label>
          Price:
          <input type="text" value={ this.state.price } onChange={ this.handleChangePrice } />
        </label>
        <label>
          URL Image:
          <input type="text" value={ this.state.image_url } onChange={ this.handleChangeURL } />
        </label>
        <label>
          Description:
          <input type="text" value={ this.state.productDescription } onChange={ this.handleChangeDesc } />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export class Controller extends React.Component {

  constructor(props){
    super(props);
    //this.products = props.products;
    this.state = {
      products: props.products,
      response: false,
    };
  }

  loadData() {
      fetch("/products")
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.setState({
            products: json,
            response: true,
          });
        });
    }

    componentDidMount() {
        this.loadData();
      }

  render() {
    if( !this.state.response ){
      return <div> The Response is not here yet! </div>;
    }
    return (
      <div className="controller">
        <div className="display">
          <Display products= {this.state.products}/>
        </div>
        <div className="productCreator">
          <ProductCreator />
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
