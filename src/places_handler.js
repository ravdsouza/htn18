class PlacesHandler{
    callApi(){
        fetch('/api/places') // Call the fetch function passing the url of the API as a parameter
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(function() {
                console.log("oops")
            });
    }
}
export default PlacesHandler;