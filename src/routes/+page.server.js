export const actions = {
	myform: async ({ request }) => {
        let data = await request.formData();
        console.log("myform: "+data.get("data"))
    }
}