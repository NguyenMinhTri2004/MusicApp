var users = [
    {
        id: 1,
        name : 'Minh Tri'
    },

    {
        id : 2,
        name : 'Son Dang'
    }
];

var comments = [
    {
        id : 1,
        user_id : 1,
        content : "hhiihih"
    },

    {
        id : 2,
        user_id : 2,
        content : "ok bro"
    }
];

function getComments() {
    return new Promise(function (resolve) {
        setTimeout(function () {
           resolve(comments);
        },1000);
    });
}

function getUsersByIds(userIds) {
   return new Promise(function (resolve){
       var result = users.filter(function (user) {
           return userIds.includes(user.id);
       });

       resolve(result)
   })
}

getComments()
  .then(function (comments) {
      var userIds = comments.map(function (comment) {
          return comment.user_id;
      });
        getUsersByIds(userIds)
           .then(function(users){
               return {
                   users: users,
                   comments : comments
               }
      })

     
  })

  .then(function (data) {
          var commentBlock = document.getElementById("tri")
          var html = ''
          data.comments.forEach(function (comment) {
              var user = data.users.find(function (user) {
                 return user.id === comment.user_id
              });
              html+=`${user.name} : ${comment.content}`;
          });
   commentBlock.innerHTML = html;
  });


// const Bai6 = React.creatElement(
//     "ul",
//     null,
//     React.createElement("li",null,"Javascript"),
//     React.createElement("li",null,"Reacts");
// )


// const Bai7 = React.createElement(
//     "div",

//     {
//         className: "post-item",
//     },

//     React.createElement("h2" , {title :"Hoc React tai f8"} , "Hoc reactjs"),
//     React.createElement("p" , null , "Rc tu can ban den nang cao")

// )



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM reactjs

function Button({title , href , onClick}){
    let Component = 'button'
    const props = {}
    if(href){
        Component = 'a'
        props.href = href
    }

    if(onClick){
        props.onClick = onClick
    }
    return (
      <Component{...props}>{title}</Component>
    )
}






function App() {
    return (
        <div id="wrapper">
             <Button>
                 title = "Click me!"
                 href = "http://thongtindaotao.sgu.edu.vn/"
                 onClick = {() => console.log(Math.random())}
             </Button>
        </div>
    )
}
////////////////////////////////CHILDRENPROP////////////////////////////////////////////////////////////////////////////////////////////////////////


function List({data , children }) {
       return (
           <ul>
               {data.map((...props) => children (...props))}
           </ul>
       )
}



function App() {
    const cars = ['BMV', 'Honda' , 'Mazda']

    return (
        <div id="wrapper"> 
           <List data = {cars} >
               {(item , index) => <li key = {index}>{item} </li>}
           </List>
        </div>
    )
}