<template>
    <button>
        {{value}}
    </button>
</template>

<script>
export default {
    name: 'ButtonItem',
    props: {
        value: {
            type: String,
            required: true
        }
    }
}
</script>