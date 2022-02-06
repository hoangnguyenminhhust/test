<template>
<div class="d-flex flex-row mb-3">
    <router-link tag="a" :to="`/app/management/product/${order._id.product[0]._id}`" class="d-block position-relative">
        <img :src="s3Url + order._id.product[0].images[0]" :alt="order._id.product[0].name" class="list-thumbnail border-0" />
    </router-link>
    <div class="pl-3 pt-2 pr-2 pb-2">
        <router-link tag="a" :to="`/app/management/product/${order._id.product[0]._id}`">
            <p class="list-item-heading">{{ order._id.product[0].name }}</p>
            <div class="text-primary text-small font-weight-medium d-none d-sm-block">Đã bán: {{ order.quantity }}</div>
        </router-link>
    </div>
</div>
</template>

<script>
import { vueS3URL } from '../../constants/config'
export default {
    props: ['order', 'detailPath'],
    data: () => ({
        s3Url: vueS3URL,
    })
}
</script>
