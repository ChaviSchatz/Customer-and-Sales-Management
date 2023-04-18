

export function HomeChild(props) {
    debugger
    const data = props.userData;
    console.log("child comp", props.userData);
    return(
        <>
        <p>hello {data.name}!!</p>
        </>
    )
}