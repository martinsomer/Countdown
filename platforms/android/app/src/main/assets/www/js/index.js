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
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
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
        
        if (localStorage.getItem('items') !== null) {
            const daysSinceEpoch = this.getDaysSinceEpoch()
            
            for (let i=0; i<JSON.parse(localStorage.getItem('items')).length; i++) {
                
                let difference = parseInt(JSON.parse(localStorage.getItem('items'))[i][1]) - daysSinceEpoch
                if (difference < 0) difference = 0
                
                // Create title element
                let title = document.createElement('div')
                title.innerHTML = JSON.parse(localStorage.getItem('items'))[i][0]
                title.setAttribute('class', 'title')
                
                // Create 'time left' element
                let time = document.createElement('div')
                time.innerHTML = difference
                time.setAttribute('class', 'time')
                
                let days = document.createElement('div')
                days.innerHTML = 'days'
                days.setAttribute('class', 'days')
                
                let timeContainer = document.createElement('div')
                timeContainer.setAttribute('class', 'timeContainer')
                timeContainer.appendChild(time)
                timeContainer.appendChild(days)
                
                // Create delete button
                let remove = document.createElement('div')
                remove.innerHTML = "&#x2716;"
                remove.setAttribute('class', 'remove')
                remove.addEventListener('click', (() => this.removeItem(event)), false)
                remove.setAttribute('id', i)
                
                // Add the item to items container
                let item = document.createElement('div')
                item.setAttribute('class', 'item')
                item.appendChild(title)
                item.appendChild(timeContainer)
                item.appendChild(remove)
                document.getElementById('items').appendChild(item)
            }
        } else {
            let noItems = document.createElement('div')
            noItems.innerHTML = 'You have no' + '<br>' + 'upcoming events.'
            noItems.setAttribute('class', 'noItems')
            document.getElementById('items').appendChild(noItems)
        }
    },
    
    getDaysSinceEpoch: function() {
        let currentDate = new Date()
        currentDate.setHours(24)
        
        return Math.floor(currentDate.getTime() / 1000 / 60 / 60 / 24)
    },
    
    removeItem: function(event) {
        if (!confirm('Delete entry?')) return
        
        let index = event.target.getAttribute('id')
        
        items = JSON.parse(localStorage.getItem('items'))
        items.splice(index, 1)
        localStorage.setItem('items', JSON.stringify(items))

        this.refreshItems()
    }
};

app.initialize()
