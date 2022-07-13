$(document).ready(function (){
    $.getJSON('static/js/data.json',function(data){
        const values = new Map(Object.entries(data.objects))
        const properties = new Map()
        const currentProperties = []
        for(let value of values.values()){
            for (let property of Object.keys(value)){
                property = property.toLowerCase()
                if(properties.get(property) !== undefined){
                    properties.get(property).push(value[property])
                }
                else{
                    properties.set(property,[value[property]])
                }
            }
        }
        for(key of properties.keys()){
            $("#keys").append($('<li>', {
                text: key,
                id: key,
                click: function (e){
                    console.log($(this))
                    const name = $(this).attr('id')
                    const index = currentProperties.indexOf(name)
                    if(index === -1){
                        currentProperties.push(name)
                        this.classList.add("clicked")
                    }else{
                        this.classList.remove("clicked")
                        if(index === 0){
                            currentProperties.splice(0,1);
                        }else{
                            currentProperties.splice(index, index)
                        }

                    }

                }
            }))
        }
        function changeResult(){

        }
    })
})
