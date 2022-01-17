import React from 'react'

export default function UserPage(props) {
  return (
    <h1>
      {props.id}
    </h1>
  )
}

export async function getServerSideProps(context){
  const {params} = context;

  const userID = params.uid;

  return {
    props: {
      id:userID
    }
  }
}