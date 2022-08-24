<template>
    <div class="modal fade" id="createCalendarTask" tabindex="-1" aria-labelledby="createCalendarTaskLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createCalendarTaskLabel">Add new task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="" class="form--workspace__create mb--20">
                        <div class="form__item">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control form-control-sm" v-model="description" id="name" placeholder="Do X on this day">
                            </div>
                        </div>
                        <div class="form__item">
                            <label for="name" class="form-label">Has this task been completed?</label>
                            <select class="form-select" aria-label="Default select example" v-model="isComplete">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div class="form__item">
                            <label for="">Select a date</label>
                            <v-date-picker v-model="date">
                                <template #default="{ inputValue, inputEvents }">
                                    <input class="px-3 py-1 border rounded" :value="inputValue" v-on="inputEvents" />
                                </template>
                            </v-date-picker>
                            <div class="form-check form-switch mt--20">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isRepeated">
                                <label class="form-check-label" for="flexSwitchCheckDefault">Repeat every week</label>
                            </div>
                        </div>
                        <div class="form__item">
                            <label for="name" class="form-label">Pick a color</label>
                            <select class="form-select" aria-label="Default select example" v-model="color">
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="purple">Purple</option>
                                <option value="yellow">Yellow</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn--primary btn--sm" :disabled="isBtnDisabled" @click="handleAddNewCalendarTask()">Add task to calendar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'CreateCalendarTask',
    data () {
       return {
            isRepeated: false,
            description: '',
            isComplete: false,
            date: new Date(),
            monthlyInterval: 1,
            color: '',
       }
    },
    computed: {
        getFullDateValue() {
            if(this.isRepeated === true && this.date) {
                const getWeekdayByDate = this.date.getDay()
                return {
                    dates: {
                        start: this.date,
                        // monthlyInterval: 1,           // Every month
                        weekdays: [getWeekdayByDate] 
                    },
                }
             } else {
                 return null
             }
        },
        getWeekdayByDate() {
            if(this.isRepeated === true && this.date) {
                return this.date.getDay()
            } else {
                return null
            }
        },
        isBtnDisabled() {
            if(!this.date || !this.description || !this) {
                return true
            } else {
                return false
            }
        }
    },
    props: ['addNewCalendarTask'],
    methods: {
        handleAddNewCalendarTask() {
            const payload = {
                // start: 
                description: this.description,
                isComplete: this.isComplete === 'no' ? false : true,
                dates: !this.isRepeated ? [this.date] : { weekdays: this.getWeekdayByDate}, // Every Friday
                color: this.color === '' ? 'red' : this.color,
            }
            this.addNewCalendarTask(payload);
            this.description = '';
            this.isComplete = false;
            this.isRepeated = false;
            this.dates = new Date();
            this.color = ''
            $('#createCalendarTask').modal('hide');
        }
    }
}
</script>