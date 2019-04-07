/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * 'License'); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    onDeviceReady: function() {
        document.getElementById('newItem').addEventListener('click', (() => window.location = "newitem.html"), false)
        this.refreshItems()
        const refreshEveryMinute = setInterval((() => this.refreshItems()), 1000*60)
    },
    
    refreshItems: function() {
        const items = document.getElementById('items')
        while (items.firstChild) {
            items.removeChild(items.firstChild)
        }
        this.retrieveItems()
    },
    
    retrieveItems: function() {
        
        if (localStorage.getItem('items') === null) {
            this.noItems()
            return
            
        } else if (JSON.parse(localStorage.getItem('items')).length === 0) {
            this.noItems()
            return
            
        } else {
            
            const currentDaysFromEpoch = this.getCurrentDaysFromEpoch()

            for (let i=0; i<JSON.parse(localStorage.getItem('items')).length; i++) {

                const difference = this.getDaysFromEpoch(i) - currentDaysFromEpoch
                if (difference < 0) difference = 0

                // Create title element
                const title = document.createElement('div')
                title.innerHTML = JSON.parse(localStorage.getItem('items'))[i][0]
                title.setAttribute('class', 'title')
                title.addEventListener('click', (() => window.location = "edititem.html?id=" + i), false)

                // Create 'time left' element
                const time = document.createElement('div')
                time.innerHTML = difference
                time.setAttribute('class', 'time')

                const days = document.createElement('div')
                days.innerHTML = 'days'
                days.setAttribute('class', 'days')

                const timeContainer = document.createElement('div')
                timeContainer.setAttribute('class', 'timeContainer')
                timeContainer.appendChild(time)
                timeContainer.appendChild(days)

                // Create delete button
                const remove = document.createElement('div')
                remove.innerHTML = "&#x2716;"
                remove.setAttribute('class', 'remove')
                remove.addEventListener('click', (() => this.removeItem(i)), false)

                // Add the item to items container
                const item = document.createElement('div')
                item.setAttribute('class', 'item')
                item.appendChild(title)
                item.appendChild(timeContainer)
                item.appendChild(remove)
                document.getElementById('items').appendChild(item)
            }
        }
    },
    
    noItems: function() {
        const noItems = document.createElement('div')
        noItems.innerHTML = 'You have no' + '<br>' + 'upcoming events.'
        noItems.setAttribute('class', 'noItems')
        document.getElementById('items').appendChild(noItems)
    },
    
    getCurrentDaysFromEpoch: function() {
        const currentDate = new Date()
        currentDate.setHours(24)
        
        return Math.floor(currentDate.getTime() / 1000 / 60 / 60 / 24)
    },
    
    getDaysFromEpoch: function(id) {
        const item = JSON.parse(localStorage.getItem('items'))[id]
        const date = new Date(item[1])
        
        return Math.floor(date.getTime() / 1000 / 60 / 60 / 24)
    },
    
    removeItem: function(id) {
        if (!confirm('Delete entry?')) return
        
        items = JSON.parse(localStorage.getItem('items'))
        items.splice(id, 1)
        localStorage.setItem('items', JSON.stringify(items))

        this.refreshItems()
    }
};

app.initialize()
