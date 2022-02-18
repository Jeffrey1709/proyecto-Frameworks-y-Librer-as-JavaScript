//alterna color de Match Game
function alternaColor(elemento){
      $(elemento).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 500)
		.delay(800)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				alternaColor('h1.main-titulo');
			},
			queue: true
		});

}


//funcion para obtener dulces de filas y columnas
function getColFil(type,index){
  var columnas=[$(".col-1").children(),$(".col-2").children(),$(".col-3").children(),$(".col-4").children(),$(".col-5").children(),$(".col-6").children(),$(".col-7").children()]
  if(type=="columna" && typeof index=="number"){
    var columna=columnas[index];
    return columna;
  }
  if(type=="fila" && typeof index=="number"){
    var fila=[];
    for(var i=0;i<columnas.length;i++){
        fila.push(columnas[i].eq(index))
    }
    return fila;
  }
}


//verifica dulces iguales en las columnas 
function checkCol(){
    for(var y=0;y<7;y++){
        var arrayTotal=[];
        var arrayA=[];
        var arrayB=[];
        var a=getColFil("columna",y).eq(0);
        var arrayAlleno=false;
        var numCandy=0;
        for(var x=1 ; x<7;x++){
            
            var b=getColFil("columna",y).eq(x);
            if(a.attr("src")==b.attr("src")){
                if(arrayAlleno){
                    if(arrayB.length == 0){
                        arrayB.push(a);
                        arrayB.push(b);
                    }else{
                      arrayB.push(b)
                    }
                }else{
                  if(arrayA.length == 0){
                    arrayA.push(a);
                    arrayA.push(b);
                  }else{
                    arrayA.push(b)
                  }
                }
            }else{
              if(arrayAlleno==false){
                if(arrayA.length>=3){
                  arrayAlleno=true;
                }else{
                  arrayA=[];
                }
              }          
            }
      
            a=getColFil("columna",y).eq(x)
      } 
        if(arrayA.length>=3){
          if(arrayB.length>=3){
            arrayTotal=[].concat(arrayA,arrayB)     
          }else{
            arrayTotal=arrayA    
          }
        }else{
          if(arrayB.length>=3){
            arrayTotal=arrayB
          }else{
            arrayTotal=[]
          }
            
        }
        if(arrayTotal.length >= 3){
         numCandy=arrayTotal.length;
         scoreDulces(numCandy)    
         for(var x=0;x<arrayTotal.length;x++){
            var arrayT=arrayTotal[x]
            if( arrayT.hasClass("remove") == false){
              arrayT.addClass("remove")
            }
         }
        }  
      
    }
   
}
//verifica si hay dulces iguales en las filas
function checkFil(){
for(var y=0;y<7;y++){
  var arrayTotal=[]
  var arrayA=[]
  var arrayB=[]
  var a= getColFil("fila",y)[0]
  var arrayAlleno=false
  var numCandy=0;
  for(var x=1;x<7;x++){
   var b=getColFil("fila",y)[x]
   if(a.attr("src")==b.attr("src")){
    if(arrayAlleno){
     if(arrayB.length==0){
      arrayB.push(a)
      arrayB.push(b)
     }else{
      arrayB.push(b)
     }
   }else{
   if(arrayA.length==0){
     arrayA.push(a)
     arrayA.push(b)
   }else{
     arrayA.push(b)
   }  
  }
  }else{
    if(!arrayAlleno){
      if(arrayA.length>=3){
        arrayAlleno=true
      }else{
        arrayA=[]
      }
    }

    }
    a=getColFil("fila",y)[x]
}
 if(arrayA.length>=3){
      if(arrayB.length>=3){
         arrayTotal=[].concat(arrayA,arrayB)
      }else{
       arrayTotal=arrayA
     }
}else{
     if(arrayB.length>=3){
       arrayTotal=arrayB
     }else{
       arrayTotal=[]
     }
   }
 if(arrayTotal.length >= 3){
       numCandy=arrayTotal.length;
       scoreDulces(numCandy)
       for(let i=0;i<arrayTotal.length;i++){
         var arrayT=arrayTotal[i]
         if(arrayT.hasClass("remove") == false){
           arrayT.addClass("remove")
         }
       }
  }
   
 }
}


//funcion que verifica si hay combinaciones de dulces en el tablero y elimina los dulces con la clase remove
function checkTablero(){ 
     checkFil();
     checkCol();
     desDraggable()
     setTimeout(()=>{
         if($(".remove").length != 0){
   
           $(".remove").effect("pulsate",1000)
                       .animate({
                        opacity:0
                        },function(){
                           $(this).remove();
                           
                           fillBoard();

                           
                           
                           }
                        )
         }else{
            actDraggable();
         }
     },50)
     
   }  

//funcion para aumentar el puntaje
function scoreDulces(numDulces){
    var puntos=Number($("#score-text").text());
    switch (numDulces) {
		case 3:
			puntos += 10;
			break;
		case 4:
			puntos += 30;
			break;
		case 5:
			puntos += 50;
			break;
		case 6:
			puntos += 100;
			break;
		case 7:
			puntos += 200;
    break;
                
	}
	$("#score-text").text(puntos);
 



}



//funcion para obtener un numero aleatorio
  function numRandom(){
     var numeroR=Math.floor((Math.random() * 4)+1);
     return numeroR;
  }

//rellena tablero
  function fillBoard(){
    var totalCandys = 6;
	var columnas = $('[class^="col-"]');

	columnas.each(function () {
		var numCandys = $(this).children().length;
		var agregaCandys = totalCandys - numCandys;
		for (var i = 0; i < agregaCandys; i++) {
			var candyImgNum = numRandom();
			if (i === 0 && numCandys < 1) {
				$(this).append('<img src="image/' + candyImgNum + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyImgNum + '.png" class="element"></img>');
			}
		}
	});
     
    setTimeout(()=>{
      setpropiedadesDragDrop()
      checkTablero()
      
      
      
    },40
    );
  }


// Establecer propiedades de arrastre
function setpropiedadesDragDrop(){
   $("img").draggable();
   $("img").draggable({
    containment: '.panel-tablero',
    revert:true,
    revertDuration:200,
    zIndex: 10
  });
  $("img").droppable();
  $("img").droppable({
    drop:function(event,ui){
          var dragElement=$(ui.draggable);
          var dropElement=$(this);
          var dragElementAttr=dragElement.attr('src');
          var dropElementAttr=dropElement.attr('src');
          dragElement.attr('src',dropElementAttr);
          dropElement.attr('src',dragElementAttr);
          checkTablero();
          numMovimientos();
    }
  })
  actDraggable()
}

//conteo de movimientos
function numMovimientos(){
    var movimientos=Number($("#movimientos-text").text());
    movimientos+=1;
    $("#movimientos-text").text(movimientos);

}

//funciones para desactivar o activar la funcion de arrastrar los elementos
function desDraggable(){
  $("img").draggable("disable")
}
function actDraggable(){
  $("img").draggable("enable")
}

//final de juego
function finJuego(){
   $('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('juego terminado');
	$('div.score, div.moves, div.panel-score').width('100%');
}


//eventos del boton inicio
function inicio(){
  
   $(".btn-reinicio").click(function(){
      if($(".btn-reinicio").text()=="Iniciar"){
     
        $(".btn-reinicio").text("reiniciar");  
        fillBoard();
        $('#timer').startTimer({
			onComplete: finJuego
		   })
      }else{
        location.reload(true);
      }
     
    })
  
}
//evento de carga del documento
$(document).ready(function(){
     alternaColor('h1.main-titulo');
     inicio();
})
