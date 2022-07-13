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
                    changeResult()
                }
            }))
        }
        function changeResult(){
            let results = new Map()
            for(let curProp of currentProperties){
                for(let key of values.keys()){
                    for(let prop of Object.keys(values.get(key))){
                        if(curProp===prop.toLowerCase()){
                            if(results.get(key) === undefined){
                                results.set(key,1)
                            }else{
                                results.set(key,results.get(key)+1)
                            }

                        }
                    }
                }
            }
            $("#results").empty();

            if(results.size === 0){
                $("#results").append($('<li>', {
                    text: "Такого обьекта нету",
                }))
            }else{

                const max = Math.max.apply(null, [...results.values()])
                results = new Map([...results].filter(([k, v]) => v === max))

                for(let result of results.keys()){
                    subText =" "
                    if(results.size > 1){
                        for(let val of currentProperties){
                            console.log(values.get(result)[val])
                            subText +=values.get(result)[val]
                        }
                    }
                    $("#results").append($('<li>', {
                        text: result+subText,
                        id: result,
                    }))
                }
            }

        }
    })
})
