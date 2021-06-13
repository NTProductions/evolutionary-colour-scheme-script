var window = new Window("palette", "Evolutionary Colour Schemes", undefined);

var displayText = window.add("statictext", undefined, "Generations: 0");
displayText.size = [180, 25];

var group = window.add("group", undefined, "group");
group.orientation = "row";
var genesisButton = group.add("button", undefined, "Genesis");
var reproduceButton = group.add("button", undefined, "Reproduce");

window.center();
window.show();

genesisButton.onClick = function() {
    app.beginUndoGroup("Generate Genesis Comp");
        generateGenesisComp();
    app.endUndoGroup();
    displayText.text = "Generations: 1";
    }

reproduceButton.onClick = function() {
        if(app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
            alert("Please select a comp");
            return false;
            }
        
        if(app.project.activeItem.selectedLayers.length != 1) {
            alert("Please select only 1 layer");
            return false;
            }
        
        var num = parseInt(displayText.text.slice(displayText.text.indexOf(":")+1, displayText.text.length))+1;
        displayText.text = "Generations: "+num;
        
        app.beginUndoGroup("Reproduce");
        reproduceScheme(app.project.activeItem.selectedLayers[0], num);
        app.endUndoGroup();
        
    }

function reproduceScheme(layer, num) {
        var comp = layer.containingComp;
        
        generateOffspringComp(comp, layer, num);
    }

function generateOffspringComp(comp, layer, num) {
        //var randomNumber = generateRandomNumber(4);
        var offspringComp = app.project.items.addComp("Offspring Comp_"+num, 2000, 2000, 1, 10, 30);
        
        var schemeOneComp = layer.source;
        var schemeOneLayer = offspringComp.layers.add(schemeOneComp);
        schemeOneLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 282]);
        
        var schemeTwoComp = app.project.items.addComp("Scheme_Comp2_", 1800, 400, 1, 10, 30);
        generateOffspringScheme(schemeTwoComp, schemeOneComp);
        var schemeTwoLayer = offspringComp.layers.add(schemeTwoComp);
        schemeTwoLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 777]);
        
        var schemeThreeComp = app.project.items.addComp("Scheme_Comp3_", 1800, 400, 1, 10, 30);
        generateOffspringScheme(schemeThreeComp, schemeOneComp);
        var schemeThreeLayer = offspringComp.layers.add(schemeThreeComp);
        schemeThreeLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 1265]);
        
        
        var schemeFourComp = app.project.items.addComp("Scheme_Comp4_", 1800, 400, 1, 10, 30);
        generateOffspringScheme(schemeFourComp, schemeOneComp);
        var schemeFourLayer = offspringComp.layers.add(schemeFourComp);
        schemeFourLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 1750]);
        
        offspringComp.openInViewer();
    }

function generateOffspringScheme(offspringComp, parentComp) {
        var solidLayerWidth = Math.floor(offspringComp.width/5);
        
        var solidLayer;
        var ogPosition;
        
        for(var i = 1; i <= 5; i++) {
            solidLayer = offspringComp.layers.addSolid(generateOffspringColour(parentComp, i), "Colour_"+i, solidLayerWidth, offspringComp.height, 1);
            ogPosition = solidLayer.property("ADBE Transform Group").property("ADBE Position").value;
            switch(i) {
                case 1:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(offspringComp.width*.1011), ogPosition[1]]);
                break;
                case 2:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(offspringComp.width*.3011), ogPosition[1]]);
                break;
                case 3:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(offspringComp.width*.5011), ogPosition[1]]);
                break;
                case 4:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(offspringComp.width*.7011), ogPosition[1]]);
                break;
                case 5:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(offspringComp.width*.9011), ogPosition[1]]);
                break;
                }
            }
    }

function generateOffspringColour(comp, colourInt) {
    var inputColourArray = [];
    
        for(var l = 1; l <= comp.numLayers; l++) {
            if(parseInt(comp.layer(l).name.split("_")[1]) == colourInt) {
                //alert("found colour match");
                inputColourArray = comp.layer(l).source.mainSource.color;
                }
            }
        var r = inputColourArray[0];
        if(Math.floor(Math.random() * 2) == 0) {
            // randomise up
            r+=Math.floor(Math.random() * 30)/100;
            } else {
            // randomise down
            r-=Math.floor(Math.random() * 30)/100;
                }
        var g = inputColourArray[1];
        if(Math.floor(Math.random() * 2) == 0) {
            // randomise up
            g+=Math.floor(Math.random() * 30)/100;
            } else {
            // randomise down
            g-=Math.floor(Math.random() * 30)/100;
                }
        var b = inputColourArray[2];
        if(Math.floor(Math.random() * 2) == 0) {
            // randomise up
            b+=Math.floor(Math.random() * 30)/100;
            } else {
            // randomise down
            b-=Math.floor(Math.random() * 30)/100;
                }
        
        return [r, g, b]
    }

function generateGenesisComp() {
        //var randomNumber = generateRandomNumber(4);
        var genesisComp = app.project.items.addComp("Genesis Comp_", 2000, 2000, 1, 10, 30);
        
        var schemeOneComp = app.project.items.addComp("Scheme_Comp1_", 1800, 400, 1, 10, 30);
        generateRandomScheme(schemeOneComp);
        var schemeOneLayer = genesisComp.layers.add(schemeOneComp);
        schemeOneLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 282]);
        
        var schemeTwoComp = app.project.items.addComp("Scheme_Comp2_", 1800, 400, 1, 10, 30);
        generateRandomScheme(schemeTwoComp);
        var schemeTwoLayer = genesisComp.layers.add(schemeTwoComp);
        schemeTwoLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 777]);
        
        var schemeThreeComp = app.project.items.addComp("Scheme_Comp3_", 1800, 400, 1, 10, 30);
        generateRandomScheme(schemeThreeComp);
        var schemeThreeLayer = genesisComp.layers.add(schemeThreeComp);
        schemeThreeLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 1265]);
        
        
        var schemeFourComp = app.project.items.addComp("Scheme_Comp4_", 1800, 400, 1, 10, 30);
        generateRandomScheme(schemeFourComp);
        var schemeFourLayer = genesisComp.layers.add(schemeFourComp);
        schemeFourLayer.property("ADBE Transform Group").property("ADBE Position").setValue([1000, 1750]);
        
        genesisComp.openInViewer();
    }

function generateRandomScheme(comp) {
        var solidLayerWidth = Math.floor(comp.width/5);
        
        var solidLayer;
        var ogPosition;
        
        for(var i = 1; i <= 5; i++) {
            solidLayer = comp.layers.addSolid(generateRandomRGB(false), "Colour_"+i, solidLayerWidth, comp.height, 1);
            ogPosition = solidLayer.property("ADBE Transform Group").property("ADBE Position").value;
            switch(i) {
                case 1:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(comp.width*.1011), ogPosition[1]]);
                break;
                case 2:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(comp.width*.3011), ogPosition[1]]);
                break;
                case 3:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(comp.width*.5011), ogPosition[1]]);
                break;
                case 4:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(comp.width*.7011), ogPosition[1]]);
                break;
                case 5:
                solidLayer.property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(comp.width*.9011), ogPosition[1]]);
                break;
                }
            }
    }

function generateRandomRGB(normal) {
    // normal = [0-255]
    if(normal) {
        return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        } else {
    // not normal = [0.0-1.0]        
        return [Math.random(), Math.random(), Math.random()];
            }
    }

function generateRandomNumber(num) {
    var randString = "";
    for(var i = 1; i <= num; i++) {
        randString+=Math.floor(Math.random() * 10);
        }
    
    return randString;
    }