
import axios from 'axios';
import './App.css';
import Category from './Category';
import { useEffect, useState } from 'react';

function App() {
  let [finalCategory,setFinalcategory]=useState([])
  let [finalProduct,setFinalProduct]=useState([])
  let [catName,setCatname]=useState("")

  let getCategory=()=>{
    axios.get('http://dummyjson.com/products/categories')
    .then((res)=>res.data)
   // .then((ree)=>ree['name'])
    .then((finalres)=>{
      setFinalcategory(finalres)
    })
  }

  useEffect(()=>{
    getCategory();
    getProduct()
  },[])

  useEffect(()=>{
    if(catName!==""){
      axios.get(`https://dummyjson.com/products/category/${catName}`)
      .then((pro)=>pro.data)
      .then((finalpro)=>{
        setFinalProduct(finalpro.products)
      })
    }
   
  },[catName])

  let getProduct=()=>{
    axios.get('https://dummyjson.com/products')
    .then((pro)=>pro.data)
    .then((finalpro)=>{
        setFinalProduct(finalpro.products)
      //  console.log(finalpro)
    })
  }

  let Pitem= finalProduct.map((products,index)=>{
    return (
      <ProductItem key={index} pdata={products} />
    )

  })
  

  return (
    <>
    <div className='py-[40px]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-center text-[40px] font-bold mb-[30px]'>Our Products</h1>
        <div className='grid grid-cols-[30%_auto] gap-[20px]'>
          <div>
            <Category finalCategory={finalCategory} setCatname={setCatname}/>
          </div>
          <div>
            <div className='grid grid-cols-3 gap-5'>
              { finalProduct.length>=1 
              ?
              Pitem
              :
              'No products found'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
       
    </>
  );
}

export default App;

function ProductItem({pdata}){
 // console.log(pdata)
  return(
    <div className='shadow-ig text-center pb-4 bg-[#ffffff]'>
                <img src={pdata.thumbnail} className='w-[100%] h-[220px]'></img>
                <h4>{pdata.title}</h4>
                <b>Rs {pdata.price}</b>
              </div>
    
  )
}