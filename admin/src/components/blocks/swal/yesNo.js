import Swal from "sweetalert2";

const yesNO = (id, cb) => {
	Swal.fire({
		title: `Do you really want to delete ${id}`,
		text: `You won't be able to revert this!`,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
		backdrop: "rgba(0,0,0,0.7)",
	}).then((result) => {
		if (result.isConfirmed) {
			cb();
			Swal.fire("Deleted!", "Your file has been deleted.", "success");
		}
	});
};
export default yesNO;
