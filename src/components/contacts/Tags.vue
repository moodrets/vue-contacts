<template>
	<div class="contact-tags">
		<div
			class="contact-tags__label app-button app-button--light"
			v-for="(tag, index) in tags"
			:key="tag"
		>
			<div>{{ tag }}</div>
			<i @click="removeTag(index)" class="material-icons">close</i>
		</div>
		<input
			@keydown.enter="addTag($event)"
			@keydown.tab="addTag($event)"
			@keydown.backspace="removeTagLast()"
			class="form-control"
			type="text"
			v-model="inputValue"
			:placeholder="props.tags.length ? '' : 'Tags'"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	tags: string[]
}>()

const inputValue = ref('')

const removeTag = (index: number) => {
	props.tags.splice(index, 1)
}

const removeTagLast = () => {
	if (inputValue.value === '') {
		props.tags.splice(props.tags.length - 1, 1)
	}
}

const addTag = (event: Event) => {
	if (props.tags.includes(inputValue.value)) {
		event.preventDefault()
		inputValue.value = ''
		return
	}

	if (inputValue.value) {
		event.preventDefault()
		props.tags.push(inputValue.value)
		inputValue.value = ''
	}
}
</script>

<style lang="scss">
.contact-tags {
    display: flex;
    align-items: center;
	flex-wrap: wrap;
    gap: var(--spacing-md);

	input {
		width: auto;
		flex: 1;
		min-width: 120px;
	}
}
</style>