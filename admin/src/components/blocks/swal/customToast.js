import Swal from "sweetalert2";

const customToast = (type="success", message="Data Saved") => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

	Toast.fire({
		icon: type,
		title: message,
	});
};

export default customToast;
