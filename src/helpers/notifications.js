export const show_popup_success = (toast_ref, message, summary) => {
    toast_ref.add({severity:'success', summary:summary, detail: message, life: 3000});
}
export const show_popup_error = (toast_ref, message, summary) => {
    toast_ref.add({severity:'error', summary:summary, detail: message, life: 3000});
}