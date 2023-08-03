<template>
    <div class="contacts-filter">
        <div class="contacts-filter__header">Filter contacts</div>
        <form @submit.prevent="onSubmit">
            <label class="form-field">
                <div class="form-field__label">By name</div>
                <div class="form-field__content">
                    <input type="text" class="form-control">
                </div>
            </label>
            <label class="form-field">
                <div class="form-field__label">By email</div>
                <div class="form-field__content">
                    <input type="text" class="form-control">
                </div>
            </label>
            <label class="form-field">
                <div class="form-field__label">By phone</div>
                <div class="form-field__content">
                    <input type="text" class="form-control">
                </div>
            </label>
            <div class="form-field">
                <div class="form-field__label">By tags</div>
                <div class="form-field__content">
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
const onSubmit = () => {

}
</script>

<style lang="scss">
.contacts-filter {
    &__header {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: var(--spacing-xl);
    }
}
</style>