#!/bin/bash

# Complete list of all shadcn/ui components (as of latest version)
components=(
  accordion
  alert
  alert-dialog
  aspect-ratio
  avatar
  badge
  breadcrumb
  button
  button-group
  calendar
  card
  carousel
  chart
  checkbox
  collapsible
  combobox
  command
  context-menu
  dialog
  direction
  drawer
  dropdown-menu
  empty
  field
  form
  hover-card
  input
  input-group
  input-otp
  item
  kbd
  label
  menubar
  navigation-menu
  pagination
  popover
  progress
  radio-group
  resizable
  scroll-area
  select
  separator
  sheet
  sidebar
  skeleton
  slider
  sonner
  spinner
  switch
  table
  tabs
  textarea
  toast
  toggle
  toggle-group
  tooltip
)

echo "🚀 Installing all ${#components[@]} shadcn/ui components..."

for component in "${components[@]}"; do
  echo "📦 Installing $component..."
  npx shadcn@latest add "$component" -y
done

echo "✅ All shadcn/ui components installed successfully!"